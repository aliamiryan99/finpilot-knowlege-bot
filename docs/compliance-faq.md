# FinPilot Analytics — Compliance FAQ

## 1. Compliance FAQ Overview

This document answers common compliance-related questions for FinPilot Analytics. It is intended for employees, customer success teams, product teams, support teams, and implementation staff.

FinPilot Analytics works with financial organizations, so compliance-sensitive communication must be handled carefully.

The most important rule is:

> FinPilot provides software and decision-support tools. FinPilot does not provide investment advice, legal advice, tax advice, accounting advice, trading instructions, or compliance certification.

Any question involving regulated advice, investment decisions, trade recommendations, legal interpretation, or customer compliance status should be handled conservatively and escalated when necessary.

## 2. Is FinPilot a Financial Advisor?

No. FinPilot Analytics is not a financial advisor, investment advisor, broker-dealer, asset manager, or trading execution provider.

FinPilot provides software tools that help customers organize information, summarize documents, evaluate internal workflows, and support human decision-making.

FinPilot does not:

- Recommend investments
- Manage portfolios
- Execute trades
- Provide personalized investment advice
- Determine suitability of financial products
- Guarantee returns
- Act as a fiduciary
- Approve trading decisions

Customers are responsible for their own regulated activities.

## 3. Can FinPilot Recommend Trades?

No. FinPilot cannot recommend trades.

FinPilot products may help summarize trading operations notes, document checklists, or organize internal research, but they must not tell a user to buy, sell, hold, short, hedge, allocate, or rebalance a specific asset.

If a user asks for a trading recommendation, the correct response is:

> FinPilot does not provide trading recommendations. Please consult your authorized internal investment, trading, legal, or compliance professionals.

## 4. Can FinPilot Predict Market Performance?

No. FinPilot does not guarantee or claim to predict market performance.

Products such as MarketPulse Dashboard may summarize available information or organize signals, but they do not guarantee that a market event will happen or that a trading strategy will succeed.

Employees must avoid statements such as:

- “This product will increase returns.”
- “This score predicts profitable trades.”
- “This tool guarantees better investment outcomes.”
- “This model can tell you which asset to buy.”

Acceptable wording:

- “This product helps organize internal information.”
- “This tool can support review workflows.”
- “This score is an internal prioritization signal.”
- “Human review is required before decisions are made.”

## 5. Can FinPilot Replace a Compliance Officer?

No. FinPilot cannot replace a compliance officer, legal team, or regulated reviewer.

FinPilot may help surface potential compliance issues, organize documents, or route cases for review, but a qualified human must make final compliance judgments.

A product output that says “compliance attention needed” is only a signal. It is not a legal conclusion.

## 6. Can FinPilot Certify That a Customer Is Compliant?

No. FinPilot cannot certify that a customer is compliant with laws, regulations, contractual obligations, or internal policies.

FinPilot can support workflows that help customers review compliance-related information, but customers remain responsible for their own compliance programs.

## 7. What Is Human-in-the-Loop Review?

Human-in-the-loop review means that a qualified person must review system outputs before important decisions are made.

Human review is required for:

- Client approval
- Trading decisions
- Legal conclusions
- Compliance conclusions
- Financial advice
- Account termination
- Material customer communication
- High-risk support escalations
- Changes to regulated workflows

FinPilot products should make human review easier, not unnecessary.

## 8. What Is a Grounded Answer?

A grounded answer is an answer based on available source material.

For FinPilot knowledge systems, grounded answers should:

- Use approved documents
- Avoid unsupported claims
- Cite source filenames when possible
- Admit when information is missing
- Avoid filling gaps with guesses
- Clearly separate facts from assumptions

If a knowledge bot cannot find relevant context, it should say:

> I do not have enough information in the current knowledge base to answer that question.

## 9. How Should AI-Generated Output Be Treated?

AI-generated output should be treated as a draft, summary, or decision-support signal.

It should not be treated as:

- Final legal advice
- Final investment advice
- Final compliance approval
- Final trading instruction
- Guaranteed truth
- A substitute for professional judgment

Employees should review AI outputs before using them in customer-facing or decision-critical contexts.

## 10. Are Customers Allowed to Upload Confidential Data?

Customers may upload confidential data only if their contract, workspace configuration, and approved product setup allow it.

Employees must not encourage customers to upload sensitive data into unapproved systems.

Sensitive data may include:

- Personal identifying information
- Financial account details
- Trading records
- Customer contracts
- Internal compliance documents
- Employee information
- Proprietary research
- Non-public business information

If there is uncertainty about whether data is allowed, escalate to the Risk and Compliance Team.

## 11. Data Retention Principles

Data retention depends on the customer agreement and product configuration.

General principles:

- FinPilot should retain only data needed for the agreed product purpose.
- Customers should avoid uploading unnecessary sensitive information.
- Internal teams should not copy customer data into unauthorized tools.
- Deletion requests should be routed through the approved support or account process.
- Logs and system metadata may be retained for security, debugging, and audit purposes depending on contract terms.

This fictional sample project does not implement real customer data retention workflows.

## 12. AI Tool Usage by Employees

Employees may use approved AI tools for:

- Drafting internal documentation
- Coding assistance
- Test case generation
- Summarizing non-sensitive material
- Brainstorming product ideas
- Reviewing wording for clarity

Employees must not use unapproved AI tools with:

- Customer confidential data
- Personal data
- Regulated financial records
- Proprietary customer documents
- Security credentials
- API keys
- Private contracts

AI-generated work must be reviewed by a human before being used in production or shared externally.

## 13. What Should Support Do If a Customer Asks for Investment Advice?

Support should not answer the investment advice question directly.

Support should respond with a safe message and escalate if needed.

Recommended response:

> FinPilot does not provide investment advice or trading recommendations. Our tools can help organize and summarize information, but any investment decision should be reviewed by your authorized professionals.

If the customer continues asking for specific advice, the issue should be escalated to Risk and Compliance.

## 14. What Should Support Do If the Bot Hallucinates?

A hallucination occurs when the bot gives an unsupported or invented answer.

Support should collect:

- User question
- Bot answer
- Retrieved sources
- Expected answer
- Relevant document if known
- Time of the issue
- Workspace or environment
- Whether ingestion was recently updated

The issue should be classified based on severity.

A hallucination involving financial advice, legal claims, or customer-facing regulated content should be escalated to Risk and Compliance and Engineering.

## 15. Can FinPilot Use Customer Data to Train Models?

FinPilot should not claim that customer data is used to train models unless the contract and product documentation explicitly allow it.

Default safe position:

> Customer data is used only according to the applicable customer agreement and product configuration. Questions about model training or data usage should be reviewed against the customer’s contract.

For this sample project, no real customer data is used.

## 16. What Is Model Risk?

Model risk is the risk that a model or AI system produces incorrect, misleading, biased, incomplete, or inappropriate outputs.

Model risk can arise from:

- Poor source data
- Incomplete documents
- Bad retrieval
- Ambiguous prompts
- Incorrect assumptions
- Overconfident language
- Lack of human review
- Unsupported generalization
- System bugs

FinPilot reduces model risk by using source grounding, human review, evaluation questions, conservative prompts, and escalation rules.

## 17. Required Disclaimers

Customer-facing materials should include appropriate disclaimers when discussing AI, scoring, analytics, or financial workflows.

Example disclaimer:

> FinPilot Analytics provides software tools for information organization, workflow support, and internal analysis. FinPilot does not provide legal, tax, accounting, investment, or trading advice. Customers are responsible for reviewing outputs and making their own decisions.

## 18. Compliance Escalation Triggers

Escalate to Risk and Compliance when a situation involves:

- Investment advice request
- Trading recommendation request
- Legal interpretation
- Customer asking whether they are compliant
- Data privacy concern
- Security concern
- Regulated marketing claim
- Misleading performance claim
- AI output that may affect a customer decision
- Enterprise customer asking for custom compliance language
- Unclear responsibility between FinPilot and the customer

## 19. Examples of Safe and Unsafe Language

### Unsafe

- “RiskLens will approve the right clients.”
- “TradeOps can recommend profitable trades.”
- “MarketPulse predicts market movements.”
- “FinPilot guarantees compliance.”
- “You should buy this asset.”
- “This client is legally safe to onboard.”

### Safer

- “RiskLens provides internal review signals.”
- “TradeOps helps document trading operations workflows.”
- “MarketPulse summarizes selected information sources.”
- “FinPilot supports compliance review but does not replace it.”
- “A qualified human should review this decision.”
- “The current documents do not contain enough information to answer that.”

## 20. Final Compliance Principle

When uncertain, FinPilot employees should choose the more conservative response and escalate.

The company prefers to say “we need human review” rather than make unsupported claims in sensitive financial contexts.

---
