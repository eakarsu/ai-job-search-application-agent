# Browser workers

Each supported site receives a versioned adapter with the same lifecycle:

1. Discover and normalize public job metadata.
2. Open an application and identify its current step.
3. Fill only fields backed by the selected candidate profile and tailored resume.
4. Persist progress after every page.
5. Return `WAITING_FOR_USER` for CAPTCHA, MFA, assessments, signatures, legal attestations, or unknown questions.
6. Submit only after the configured final-review gate.
7. Capture the confirmation number, timestamp, final answers, and submitted resume.

Initial adapter targets are LinkedIn, Monster, Dice, Workday, Greenhouse, Lever, iCIMS, and employer-hosted career sites.

This directory currently documents the worker contract. Live third-party submission adapters and account connections have not been configured.
