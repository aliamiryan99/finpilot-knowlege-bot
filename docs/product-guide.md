# FinPilot Analytics — Product Guide

## 1. Product Guide Overview

This document describes the fictional product line of FinPilot Analytics. It is intended for internal employees, customer success staff, support teams, and technical implementation teams.

FinPilot Analytics offers software products that help financial organizations organize information, evaluate client opportunities, assess operational risk, and document trading-related workflows.

The current product line includes:

1. **MarketPulse Dashboard**
2. **RiskLens Scorer**
3. **TradeOps Assistant**

These products may be used separately or together depending on the customer’s needs.

FinPilot products are decision-support tools. They do not provide regulated investment advice, execute trades, or make final business decisions.

## 2. Product Principles

All FinPilot products are designed according to the following principles.

### 2.1 Explainability

Users should understand why a product generated a summary, score, alert, or recommendation. When possible, outputs should be connected to source data or visible business rules.

### 2.2 Human-in-the-Loop Review

FinPilot tools assist human professionals. They do not replace account managers, traders, analysts, compliance officers, or executives.

### 2.3 Conservative Financial Claims

FinPilot products should not claim to improve returns, guarantee profit, eliminate risk, or ensure compliance.

### 2.4 Configurable Workflows

Different financial teams have different review processes. Products should support configurable scoring rules, review checklists, escalation categories, and output templates.

### 2.5 Secure Internal Knowledge

Products that use internal documents should retrieve and summarize information only from authorized sources.

## 3. Product 1: MarketPulse Dashboard

### 3.1 Product Summary

MarketPulse Dashboard is a financial intelligence dashboard that helps teams monitor client, market, and operational signals in one place.

It is designed for:

- Business development teams
- Client success teams
- Financial analysts
- Internal strategy teams
- Small trading organizations
- Portfolio support teams

MarketPulse does not predict the market or provide buy/sell recommendations. It summarizes relevant information so that users can review it more efficiently.

### 3.2 Core Use Cases

MarketPulse Dashboard can be used to:

- Summarize client account activity
- Track market news categories selected by the customer
- Monitor client engagement signals
- Identify accounts that may need follow-up
- Organize research notes
- Generate internal briefing summaries
- Prepare meeting notes for customer reviews

### 3.3 Main Features

#### Signal Summary

MarketPulse groups relevant signals into short summaries. Signals may include customer interactions, product usage indicators, manually uploaded research notes, or approved internal data sources.

#### Client Briefing View

The Client Briefing View provides a structured summary of a client or account before a meeting. It may include:

- Account overview
- Recent interactions
- Open support issues
- Relevant product usage
- Known risks
- Suggested discussion topics

#### Watchlist View

Users can create watchlists for accounts, sectors, or themes. Watchlists help teams monitor selected items without manually searching across multiple tools.

#### Internal Notes

MarketPulse allows users to attach notes to client records or internal research items. These notes can later be used in summaries if the customer enables that workflow.

### 3.4 Limitations

MarketPulse Dashboard does not:

- Provide investment recommendations
- Guarantee accuracy of external market data
- Replace analyst judgment
- Execute trades
- Automatically approve client actions
- Provide legal, tax, or accounting advice

### 3.5 Example Questions MarketPulse Can Help Answer

- Which client accounts had recent high-priority activity?
- What are the main open issues for this client?
- Which accounts should customer success review this week?
- What internal notes are available before a client meeting?
- What risks should be discussed before renewal?

## 4. Product 2: RiskLens Scorer

### 4.1 Product Summary

RiskLens Scorer is an internal scoring and prioritization tool. It helps teams evaluate client fit, operational complexity, support risk, and opportunity priority.

RiskLens is especially relevant to the “AI Client Audit & Opportunity Scorer” use case. It can organize client information into structured categories and produce an explainable score that helps teams decide what to review next.

RiskLens should not be treated as a final decision maker. Its output is an internal signal for human review.

### 4.2 Core Use Cases

RiskLens Scorer can be used to:

- Score potential client opportunities
- Prioritize accounts for review
- Identify missing client information
- Detect operational complexity
- Flag accounts requiring compliance review
- Summarize strengths and risks for a client opportunity
- Support internal go/no-go discussions

### 4.3 Scoring Dimensions

RiskLens may score a client or opportunity across several dimensions.

#### Fit Score

The Fit Score estimates how well a client matches FinPilot’s target customer profile. Relevant factors may include company size, industry, workflow needs, technical readiness, and internal use case clarity.

#### Opportunity Score

The Opportunity Score estimates the commercial potential of the account. Relevant factors may include expected usage, number of teams involved, urgency of the problem, expansion potential, and strategic value.

#### Operational Complexity Score

The Operational Complexity Score estimates how difficult implementation may be. Relevant factors may include data quality, required integrations, approval process, number of stakeholders, and customization needs.

#### Compliance Attention Score

The Compliance Attention Score identifies whether the account may require additional risk or compliance review. Relevant factors may include regulated language, requests for trading recommendations, sensitive data usage, or unclear client responsibilities.

### 4.4 Example RiskLens Output

A typical RiskLens output may include:

- Overall review priority
- Fit score
- Opportunity score
- Operational complexity score
- Compliance attention score
- Explanation of each score
- Missing information
- Suggested next step
- Recommended owner

Example internal output:

> The client appears to be a strong fit because they operate a small trading research team and need support with internal knowledge retrieval. However, the opportunity requires compliance review because the client asked whether the system can recommend specific trades.

### 4.5 Recommended Score Interpretation

RiskLens scores should be interpreted as internal guidance.

| Score Range | Meaning                                  |
| ----------- | ---------------------------------------- |
| 80–100      | Strong signal; review soon               |
| 60–79       | Moderate signal; review with context     |
| 40–59       | Weak or incomplete signal                |
| 0–39        | Low priority or insufficient information |

A high score does not guarantee that a client should be accepted. A low score does not automatically reject a client. Human review is always required.

### 4.6 Limitations

RiskLens Scorer does not:

- Make final sales decisions
- Make final compliance decisions
- Guarantee client quality
- Predict revenue with certainty
- Replace human account review
- Determine legal suitability
- Provide investment recommendations

## 5. Product 3: TradeOps Assistant

### 5.1 Product Summary

TradeOps Assistant is a workflow assistant for trading operations teams. It helps document trading processes, prepare checklists, summarize operational notes, and organize post-trade review information.

TradeOps Assistant is not a trading bot. It does not place orders, recommend trades, or approve trading strategies.

### 5.2 Core Use Cases

TradeOps Assistant can be used to:

- Prepare operational checklists
- Summarize trade review notes
- Document exception handling
- Organize pre-trade and post-trade workflow steps
- Help teams maintain process consistency
- Generate internal summaries for review meetings

### 5.3 Example Workflow

A trading operations team may use TradeOps Assistant as follows:

1. Upload or reference an internal checklist.
2. Ask the assistant to summarize required operational steps.
3. Review open exceptions.
4. Generate a meeting summary.
5. Assign follow-up tasks to human owners.

The assistant can make workflow documentation easier, but the responsible trading or operations professional must make final decisions.

### 5.4 Limitations

TradeOps Assistant does not:

- Execute orders
- Recommend securities
- Provide trading signals
- Guarantee operational accuracy
- Replace authorized trader approval
- Override internal risk controls
- Connect directly to live trading systems by default

## 6. Pricing Tiers

FinPilot Analytics uses fictional pricing tiers for this sample project.

### 6.1 Starter Tier

The Starter Tier is intended for small teams testing one workflow.

Includes:

- Up to 5 internal users
- One knowledge base
- Basic support during standard business hours
- Manual document ingestion
- Basic source references

Starter is best for small pilots and proof-of-concept projects.

### 6.2 Growth Tier

The Growth Tier is intended for growing teams with multiple workflows.

Includes:

- Up to 25 internal users
- Multiple knowledge collections
- Workflow templates
- Priority support
- Configurable scoring rules
- Basic usage analytics

Growth is best for customer success teams, research teams, and small financial operations teams.

### 6.3 Enterprise Tier

The Enterprise Tier is intended for larger customers with stricter governance requirements.

Includes:

- Custom user limits
- Advanced permission design
- Dedicated onboarding
- Extended support options
- Compliance review workflows
- Custom integrations
- Audit-friendly reporting
- Optional private deployment discussion

Enterprise customers may receive custom implementation planning depending on contract terms.

## 7. Product Comparison

| Feature                       | MarketPulse Dashboard | RiskLens Scorer | TradeOps Assistant |
| ----------------------------- | --------------------- | --------------- | ------------------ |
| Client summaries              | Yes                   | Yes             | Limited            |
| Opportunity scoring           | Limited               | Yes             | No                 |
| Operational checklists        | Limited               | Limited         | Yes                |
| Compliance escalation support | Yes                   | Yes             | Yes                |
| Trading execution             | No                    | No              | No                 |
| Source-grounded summaries     | Yes                   | Yes             | Yes                |
| Human review required         | Yes                   | Yes             | Yes                |

## 8. Recommended Product by Use Case

### Client meeting preparation

Recommended product: **MarketPulse Dashboard**

Reason: It summarizes account information, recent activity, and discussion topics.

### Client audit and opportunity scoring

Recommended product: **RiskLens Scorer**

Reason: It is designed to evaluate fit, opportunity, complexity, and compliance attention.

### Trading workflow documentation

Recommended product: **TradeOps Assistant**

Reason: It supports checklists, operational review, and post-trade summaries.

### Internal policy search

Recommended product: **Knowledge Bot workflow using approved documents**

Reason: Internal policy search requires grounded retrieval from company documents.

## 9. Implementation Notes

For customers adopting FinPilot products, implementation usually involves:

1. Defining the use case
2. Selecting source documents or data sources
3. Configuring retrieval or scoring rules
4. Testing outputs against evaluation cases
5. Training users
6. Reviewing risk and compliance concerns
7. Launching a limited pilot
8. Expanding after successful review

FinPilot recommends starting with a narrow workflow rather than trying to automate every process at once.

## 10. Support and Escalation

Product questions should first be handled by Customer Success. Technical issues should be routed to Engineering Support. Compliance-sensitive product questions should be escalated to the Risk and Compliance Team.

Examples of compliance-sensitive product questions include:

- Can RiskLens approve clients automatically?
- Can TradeOps recommend specific trades?
- Can MarketPulse predict returns?
- Can FinPilot guarantee regulatory compliance?
- Can FinPilot replace our compliance officer?

The correct answer to these questions is no. FinPilot can support analysis and workflow documentation, but it cannot replace regulated human responsibilities.

---
