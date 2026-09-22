# CareerFlow AI - Job Search and Application Agent

A separate Next.js application patterned after the `homeServices` project: public landing page, responsive sidebar dashboard, cards, tables, modal workflows, and mobile navigation. Its domain is finding recent jobs, tailoring a verified master resume to each job, completing multistep applications, and tracking every submission.

## Run locally

```bash
./start.sh
```

The default URL is `http://127.0.0.1:3075`. Override it with `FRONTEND_PORT`.

## Intended workflow

1. Collect a detailed candidate profile and master resume.
2. Search configured job sources for postings from the last 1 through 7 days.
3. Normalize and deduplicate jobs from job boards and employer career sites.
4. Score each job against the candidate's verified experience and preferences.
5. Create and save a job-specific resume without inventing qualifications.
6. Run each application as a resumable multistep workflow.
7. Pause for new questions, CAPTCHA, MFA, assessments, legal attestations, and signatures.
8. Save the final answers, submitted resume, confirmation number, and application status.

## Project layout

- `src/app/` - landing page and candidate dashboard routes
- `src/components/` - shared HomeServ-style navigation and UI
- `src/lib/` - normalized domain data and application types
- `browser-workers/` - site-specific application adapters
- `data/master-resumes/` - source resumes supplied by the candidate
- `data/tailored-resumes/` - one immutable output folder per job application
- `docs/` - architecture and product decisions

## Application states

`Discovered -> Matched -> Resume Ready -> Applying -> Waiting for User -> Ready to Submit -> Submitted`

Applications can also end as `Skipped`, `Withdrawn`, `Rejected`, or `Closed`.

## Profile rules

- The candidate supplies all identity, demographic, work authorization, veteran, disability, salary, relocation, and availability answers.
- Sensitive answers are stored separately and used only when the candidate has authorized their use.
- Job-specific answers and resumes use verified profile evidence.
- The system does not infer disability status from individual conditions or descriptions.
- New or ambiguous questions pause the workflow and are saved after the candidate answers.
