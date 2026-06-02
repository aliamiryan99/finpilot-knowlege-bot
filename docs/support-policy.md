# FinPilot Analytics — Support Policy

## 1. Support Policy Overview

This document explains the fictional support policy for FinPilot Analytics customers. It is intended for internal support teams, customer success managers, implementation specialists, and customers who need to understand how support requests are handled.

The support policy defines:

- Support hours
- Support channels
- Priority levels
- Response targets
- Escalation rules
- Customer responsibilities
- Refund and credit principles
- Enterprise support expectations

FinPilot Analytics provides software support for its own products. It does not provide investment advice, legal advice, tax advice, trading instructions, or emergency financial assistance through support channels.

## 2. Standard Support Hours

Standard support hours are:

**Monday to Friday, 09:00 to 18:00 in the customer’s contracted business timezone.**

Support is not normally available on weekends or public holidays unless the customer has an enterprise agreement that includes extended support coverage.

Standard support covers:

- Product usage questions
- Bug reports
- Account configuration questions
- Document ingestion support
- Basic troubleshooting
- Clarification of product behavior
- Help with setup and onboarding

Standard support does not include custom engineering work, legal interpretation, investment analysis, or urgent trading desk coverage.

## 3. Support Channels

FinPilot Analytics supports the following fictional support channels.

### 3.1 Email Support

Customers may send support requests by email. Email is the default support channel for most requests.

Email support is appropriate for:

- General product questions
- Setup issues
- Documentation questions
- Non-urgent bug reports
- Billing questions
- Feature clarification

### 3.2 In-App Support Form

Customers may submit issues through an in-app support form. The in-app form may automatically include product context such as workspace ID, page URL, browser type, and error details.

The in-app support form is recommended for technical problems because it gives support staff better diagnostic context.

### 3.3 Enterprise Support Channel

Enterprise customers may have a dedicated support channel depending on contract terms. This may include a shared Slack Connect channel, dedicated email alias, or named customer success manager.

Enterprise channels are intended for coordination and triage. They do not guarantee immediate resolution for all issues.

### 3.4 Emergency Escalation

Emergency escalation is available only for enterprise customers with that coverage in their contract.

Emergency escalation should be used only for severe production issues, such as a major outage affecting business-critical workflows.

## 4. Support Priority Levels

FinPilot uses four support priority levels.

## Priority 1 — Critical Production Issue

A Priority 1 issue means a production system is unavailable or severely degraded for multiple users, and there is no reasonable workaround.

Examples:

- The application is unavailable for all users in a customer workspace.
- Login is broken for an entire customer organization.
- A critical production workflow cannot be accessed.
- A data privacy or security incident is suspected.
- The system returns incorrect source-grounded outputs across many customer queries due to a confirmed technical fault.

Target first response:

- Enterprise: 1 business hour, or faster if emergency coverage applies
- Growth: 4 business hours
- Starter: 1 business day

Priority 1 issues must be escalated to Engineering Support and, if relevant, Risk and Compliance.

## Priority 2 — Major Functionality Issue

A Priority 2 issue means an important product feature is not working correctly, but the entire system is not down.

Examples:

- Document ingestion fails for a customer knowledge base.
- A scoring workflow cannot complete.
- A dashboard loads but key sections fail.
- Several users experience repeated errors.
- Source references are missing from answers in a workflow where source display is required.

Target first response:

- Enterprise: 4 business hours
- Growth: 1 business day
- Starter: 2 business days

Priority 2 issues may require Engineering Support review.

## Priority 3 — Standard Issue or Product Question

A Priority 3 issue is a normal product support request.

Examples:

- How to add documents to a knowledge base
- How to interpret a RiskLens score
- How to configure a dashboard view
- How to invite a user
- How to update account settings
- Clarification about product limitations

Target first response:

- Enterprise: 1 business day
- Growth: 2 business days
- Starter: 3 business days

Priority 3 issues are normally handled by Customer Success or Support.

## Priority 4 — Low Priority Request or Feature Suggestion

A Priority 4 issue is a low urgency request, documentation suggestion, or feature idea.

Examples:

- Requesting a new dashboard layout
- Suggesting a new export format
- Asking for additional examples in documentation
- Requesting a future integration
- Minor UI feedback

Target first response:

- Enterprise: 3 business days
- Growth: 5 business days
- Starter: Best effort

Priority 4 requests may be reviewed during product planning but are not guaranteed to be implemented.

## 5. Response Targets vs. Resolution Times

Support response targets are not the same as resolution guarantees.

A first response means that FinPilot has acknowledged the issue and begun triage. It does not mean the issue has been fully resolved.

Resolution time depends on:

- Issue complexity
- Customer environment
- Availability of diagnostic information
- Need for engineering changes
- Third-party service dependencies
- Risk or compliance review
- Customer responsiveness

FinPilot does not guarantee that all issues will be resolved within the first response window.

## 6. Customer Responsibilities

Customers are responsible for providing enough information for FinPilot to investigate support requests.

A useful support request should include:

- Clear description of the issue
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Screenshots if relevant
- Approximate time the issue occurred
- User or workspace affected
- Browser and operating system if relevant
- Whether the issue affects one user or many users
- Whether there is a deadline or business impact

For RAG or knowledge bot issues, customers should also include:

- Example question asked
- Answer received
- Expected answer
- Relevant source document if known
- Whether the document was recently updated
- Whether ingestion was rerun after document changes

## 7. Support Escalation Rules

Support staff should escalate issues when they involve:

- Possible security or data privacy concern
- Possible legal or regulatory issue
- Customer request for investment advice
- Incorrect or misleading financial claim
- Production outage
- Enterprise customer relationship risk
- Repeated failures in a core workflow
- Unclear product behavior with customer impact
- A customer threatening cancellation due to unresolved issues

Escalations should include a concise summary, priority level, customer impact, relevant evidence, and recommended next action.

## 8. Compliance-Sensitive Support Requests

Some support requests require careful handling because FinPilot operates in financial contexts.

Support staff must not:

- Recommend securities
- Tell a customer whether to buy, sell, or hold an asset
- Provide legal advice
- Provide tax advice
- Promise investment performance
- Confirm that a customer is compliant with law
- Approve a trading strategy
- Interpret regulations as legal counsel

If a customer asks a compliance-sensitive question, support staff should respond conservatively and escalate to the Risk and Compliance Team when needed.

Example response:

> FinPilot can help organize and summarize your internal information, but we cannot provide legal, regulatory, or investment advice. This question should be reviewed by your internal compliance or legal team.

## 9. Bug Reports

A bug is product behavior that does not match expected or documented behavior.

Support should classify bug reports by severity and reproducibility.

Useful bug report fields include:

- Product area
- Steps to reproduce
- Expected result
- Actual result
- Frequency
- Impact
- Screenshots or logs
- Customer tier
- Workaround available or not

A bug that affects many customers or sensitive workflows should be escalated faster than a bug affecting a minor UI detail.

## 10. Feature Requests

Feature requests should be recorded and tagged by product area.

A feature request should include:

- Customer need
- Current workaround
- Business impact
- Number of users affected
- Whether it blocks adoption or renewal
- Suggested behavior
- Relevant product area

Feature requests are not commitments. Product Management decides whether to include them in the roadmap.

## 11. Document Ingestion Support

FinPilot may help customers troubleshoot document ingestion issues.

Common ingestion issues include:

- Unsupported file format
- Empty document
- Poorly structured text
- Duplicate documents
- Outdated document version
- Incorrect collection selected
- Embedding job failed
- Document was uploaded but not indexed
- User forgot to rerun ingestion after editing docs

For this sample project, documents are stored in the local `/docs` folder and ingestion must be run manually.

## 12. Refund and Service Credit Principles

Refunds and service credits are handled according to the customer’s contract.

General fictional principles:

- Starter customers are not automatically eligible for service credits.
- Growth customers may request review for major service failures.
- Enterprise customers may have custom service credit terms.
- Refunds are not provided for dissatisfaction caused by unsupported use cases.
- Refunds are not provided when the customer uses the product against documented limitations.
- Billing disputes must be submitted within 30 days of invoice date.

Support staff should not promise refunds or credits without approval from Finance or Account Management.

## 13. Enterprise Support Expectations

Enterprise support may include:

- Named customer success manager
- Dedicated onboarding plan
- Priority response targets
- Extended support window
- Quarterly business review
- Custom escalation process
- Implementation planning
- Security and compliance coordination

Enterprise support does not mean that FinPilot will build unlimited custom features or provide regulated financial services.

## 14. Internal Support Ownership

Support ownership is divided as follows:

| Issue Type                    | Primary Owner       | Escalation Team     |
| ----------------------------- | ------------------- | ------------------- |
| Product usage question        | Customer Success    | Product             |
| Bug report                    | Support             | Engineering         |
| Outage                        | Engineering Support | Engineering Lead    |
| Compliance-sensitive question | Support             | Risk and Compliance |
| Billing question              | Customer Success    | Finance             |
| Feature request               | Product             | Product Leadership  |
| Enterprise relationship issue | Customer Success    | Account Management  |

## 15. Support Quality Standards

A good support response should be:

- Clear
- Accurate
- Calm
- Specific
- Grounded in product documentation
- Honest about uncertainty
- Free of unsupported financial claims
- Action-oriented

Support staff should avoid vague responses such as “we are looking into it” without explaining the next step.

A better response is:

> We have reproduced the ingestion error and escalated it to Engineering Support as a Priority 2 issue. The current workaround is to remove empty sections from the Markdown file and rerun ingestion. We will update you after engineering review.

## 16. Closing a Support Ticket

A support ticket may be closed when:

- The issue has been resolved
- The customer confirms resolution
- A workaround has been provided and accepted
- The request is outside product scope
- The customer has not responded after reasonable follow-up
- The issue has been converted into a feature request

Closed tickets should include a final summary.

---
