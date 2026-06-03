import type { DocumentChunk } from "./types";

export function chunkDocument(source: string, content: string): DocumentChunk[] {
  const lines = content.split("\n");
  const sections: { headings: string[]; lines: string[] }[] = [];
  let currentHeadings: string[] = [];
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    
    if (headingMatch) {
      // Save current accumulated lines to previous section
      if (currentLines.length > 0) {
        sections.push({
          headings: [...currentHeadings],
          lines: [...currentLines],
        });
        currentLines = [];
      }
      
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      
      if (level === 1) {
        currentHeadings = [title];
      } else if (level === 2) {
        currentHeadings = [currentHeadings[0] || "", title];
      } else {
        currentHeadings = [currentHeadings[0] || "", currentHeadings[1] || "", title];
      }
    } else {
      currentLines.push(line);
    }
  }

  // Push remaining lines at the end of the file
  if (currentLines.length > 0) {
    sections.push({
      headings: [...currentHeadings],
      lines: [...currentLines],
    });
  }

  const maxChunkSize = 1000;
  const chunks: DocumentChunk[] = [];
  let chunkCounter = 0;

  for (const section of sections) {
    const headingPath = section.headings.filter(Boolean).join(" > ");
    const headingPrefix = headingPath ? `Context: ${headingPath}\n\n` : "";
    const sectionText = section.lines.join("\n").trim();
    if (!sectionText) continue;

    if (headingPrefix.length + sectionText.length <= maxChunkSize) {
      chunks.push({
        id: `${source}-${chunkCounter}`,
        content: headingPrefix + sectionText,
        source,
        chunkIndex: chunkCounter,
      });
      chunkCounter++;
    } else {
      // Split long sections by paragraphs
      const paragraphs = sectionText.split(/\n\s*\n/);
      let currentChunkBuffer = "";

      for (const paragraph of paragraphs) {
        const trimmedParagraph = paragraph.trim();
        if (!trimmedParagraph) continue;

        if (
          headingPrefix.length +
            currentChunkBuffer.length +
            (currentChunkBuffer ? 2 : 0) +
            trimmedParagraph.length <=
          maxChunkSize
        ) {
          currentChunkBuffer += (currentChunkBuffer ? "\n\n" : "") + trimmedParagraph;
        } else {
          // Flush buffer
          if (currentChunkBuffer) {
            chunks.push({
              id: `${source}-${chunkCounter}`,
              content: headingPrefix + currentChunkBuffer,
              source,
              chunkIndex: chunkCounter,
            });
            chunkCounter++;
          }

          // If individual paragraph is too large, split by maximum characters
          if (headingPrefix.length + trimmedParagraph.length > maxChunkSize) {
            let remaining = trimmedParagraph;
            const limit = maxChunkSize - headingPrefix.length;
            while (remaining.length > 0) {
              const take = remaining.slice(0, limit);
              chunks.push({
                id: `${source}-${chunkCounter}`,
                content: headingPrefix + take,
                source,
                chunkIndex: chunkCounter,
              });
              chunkCounter++;
              remaining = remaining.slice(limit);
            }
            currentChunkBuffer = "";
          } else {
            currentChunkBuffer = trimmedParagraph;
          }
        }
      }

      if (currentChunkBuffer) {
        chunks.push({
          id: `${source}-${chunkCounter}`,
          content: headingPrefix + currentChunkBuffer,
          source,
          chunkIndex: chunkCounter,
        });
        chunkCounter++;
      }
    }
  }

  return chunks;
}
