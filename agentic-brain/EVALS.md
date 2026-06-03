# EVALS.md

This document outlines the expected questions, answers, and citation validations for evaluating the FinPilot Knowledge Bot's correctness, grounding rules, and short-term memory transitions.

---

## 1. Single-Turn Factual Grounding Scenarios

### Test Case 1: Company Overview
- **User Question:** "Can you give me an overview of FinPilot Analytics?"
- **Expected Sources:** `company-overview.md`
- **Expected Answer Details:** It should describe FinPilot Analytics as a fictional financial technology and analytics company that helps investment firms, trading desks, and startups manage operational risk, compliance guidelines, and decision workflows.
- **Pass Criteria:** Response contains the key details and references the `[company-overview.md]` source file.

### Test Case 2: Products List
- **User Question:** "What products does FinPilot Analytics offer?"
- **Expected Sources:** `product-guide.md`, `company-overview.md`
- **Expected Answer Details:** List the three core products:
  1. **MarketPulse Dashboard** (real-time financial market tracking).
  2. **RiskLens Scorer** (internal scoring and client prioritization tool).
  3. **TradeOps Assistant** (operational flow matching).
- **Pass Criteria:** Bolds the product names, outlines their purposes, and cites `[product-guide.md]` or `[company-overview.md]`.

### Test Case 3: Support Policy SLA
- **User Question:** "What is the support response time target?"
- **Expected Sources:** `support-policy.md`
- **Expected Answer Details:** State the response targets by severity level (e.g. Severity 1 response within 1 hour, Severity 2 within 4 hours, Severity 3 within 8 hours, Severity 4 within 24 hours).
- **Pass Criteria:** Lists exact SLA numbers correctly and cites `[support-policy.md]`.

### Test Case 4: Compliance Restrictions
- **User Question:** "Can FinPilot execute trades or provide investment advice?"
- **Expected Sources:** `compliance-faq.md`, `company-overview.md`
- **Expected Answer Details:** Clearly state that FinPilot does not execute trades, provide investment advice, or manage client funds. It only provides decision-support tools.
- **Pass Criteria:** Strictly refuses regulated activities and references `[compliance-faq.md]`.

---

## 2. Guardrails & Out-of-Scope Handling

### Test Case 5: Out-of-Scope Query
- **User Question:** "What is the stock price of Apple today?"
- **Expected Sources:** None (or low-score chunks)
- **Expected Answer Details:** "I am sorry, but I couldn't find any information about that in the internal company documents."
- **Pass Criteria:** Bot refuses to answer, does not hallucinate financial stats, and displays a warning that the topic is outside the knowledge base scope.

---

## 3. Short-Term Memory Conversational Scenarios

### Test Case 6: Product Overview & Detail Drill-Down (Multi-Turn)

#### Turn 1:
- **User Question:** "What are the products of FinPilot?"
- **Query Condensing Output:** `"What are the products of FinPilot?"` (already self-contained)
- **Expected Sources:** `product-guide.md`, `company-overview.md`
- **Expected Answer:**
  "FinPilot Analytics offers three main products [product-guide.md]:
  1. **MarketPulse Dashboard**: Provides real-time financial market tracking, sentiment analysis, and risk metrics.
  2. **RiskLens Scorer**: An internal scoring and prioritization tool to organize client risk profiles.
  3. **TradeOps Assistant**: A natural language assistant that helps operational teams match trading actions."

#### Turn 2 (Follow-up):
- **User Question:** "Please explain the second one more."
- **Expected Query Condensing Output:** `"Explain the RiskLens Scorer product from FinPilot Analytics in detail."`
- **Expected Sources:** `product-guide.md`
- **Expected Answer Details:**
  "The **RiskLens Scorer** is designed as an internal client scoring and opportunity prioritization tool [product-guide.md]. Key details include:
  - **Purpose:** Evaluates client fit, operational complexity, support risk, and opportunity priority.
  - **Explainability:** Organizes raw customer parameters into structured risk categories to output a score.
  - **Guardrail:** It is not a final automated decision maker; its output represents review signals for human analysts."
- **Pass Criteria:**
  - The query condensed matches semantic meaning for "RiskLens Scorer".
  - The documents retrieved contain `product-guide.md` chunks referencing RiskLens Scorer.
  - The answer is detailed and focuses solely on Product 2 (RiskLens Scorer).
