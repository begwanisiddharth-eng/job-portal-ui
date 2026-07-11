# JobPortal

A React single-page job board where job seekers browse and apply to jobs, employers post
openings and manage applicants, and admins manage the company/employer directory. Built
with React 19, Vite 7, Tailwind CSS 4, and React Router 7. There is no backend — all data
comes from an in-memory mock dataset and `localStorage`, so the entire app runs client-side.

## Features

### Public (no account needed)

- **Home page** — hero search bar, featured jobs, and top hiring companies.
- **Job search & filtering** (`/jobs`) — filter by keyword, location, category, experience
  level, work type, minimum salary, and remote-only; sort by recency, popularity, or salary;
  results are paginated.
- **Job details** (`/jobs/:id`) — full description, requirements, benefits, and salary range.
- **Company directory** (`/companies`) and **company profiles** (`/companies/:id`) — browse
  companies and see their open positions.
- **Contact form** (`/contact`) — sends a message that admins can review.
- **Dark / light theme toggle** — available from the navbar on every page.

### Job seekers (`ROLE_JOB_SEEKER`)

- **Apply to jobs** directly from a job listing or job detail page.
- **Applied Jobs** (`/applied-jobs`) — track submitted applications and their status, or
  withdraw an application.
- **Saved Jobs** (`/saved-jobs`) — bookmark jobs to revisit later.
- **Profile** (`/profile`) — manage contact info, bio, skills, work history, education,
  portfolio link, resume, and profile picture. A complete profile is required before
  applying to jobs.

### Employers (`ROLE_EMPLOYER`)

- **Post a Job** (`/post-job`) — create a listing with title, description, location, job
  type, work type, category, experience level, salary range, application deadline,
  requirements, and benefits.
- **My Job Postings** (`/employer/jobs`) — view all jobs you've posted and update their
  status (e.g. open/closed).
- **Applicants** (`/job-applicants/:jobId`) — review everyone who applied to a specific
  job, filter by application status, and view applicant profiles/contact details.

### Admins (`ROLE_ADMIN`)

- **Dashboard** (`/admin`) — overview with quick links into each admin area.
- **Company Management** (`/admin/companies`) — create, edit, and delete companies shown
  in the directory.
- **Employer Management** (`/admin/employers`) — look up a registered user by email and
  assign them to a company as an employer.
- **Contact Messages** (`/admin/contact-messages`) — review messages submitted through the
  public contact form.

## Getting Started

```bash
npm install
npm run dev       # start the Vite dev server (http://localhost:5173)
```

Other commands:

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # run ESLint
```

## Using the Application

The app ships with demo accounts for each role — use the **Show Demo Credentials** button
on the login page, or sign in directly with any of the following:

| Role        | Email                    | Password       |
| ----------- | ------------------------ | -------------- |
| Job Seeker  | `jobseeker@email.com`    | `jobseeker123` |
| Job Seeker  | `candidate@email.com`    | `candidate123` |
| Employer    | `employer@company.com`   | `employer123`  |
| Employer    | `hr@startup.com`         | `hr123`        |
| Admin       | `admin@portal.com`       | `admin123`     |

You can also **register** a new job seeker account from `/register`. New employer accounts
must be created as a job seeker first and then assigned to a company by an admin via
Employer Management.

A typical walkthrough:

1. **Browse without signing in** — search or filter jobs from the home page or `/jobs`.
2. **Sign in as a job seeker** (`jobseeker@email.com` / `jobseeker123`) — apply to a job,
   save one for later, and check `/applied-jobs` and `/saved-jobs`.
3. **Sign in as an employer** (`employer@company.com` / `employer123`) — post a new job
   from `/post-job`, then view it under `/employer/jobs` and check its applicants.
4. **Sign in as an admin** (`admin@portal.com` / `admin123`) — manage companies, assign an
   employer to a company, and review contact form submissions.

## Data & Persistence

There is no server. All content is seeded from `src/data/mockData.js` and persisted in the
browser's `localStorage` (applications, saved jobs, posted jobs, registered users, and the
logged-in session). Clearing your browser storage resets the app to its initial state.
"API" calls in `src/services/` are simulated with an artificial delay to mimic real network
requests.

## Tech Stack

- **React 19** with functional components and hooks
- **Vite 7** for dev server and build
- **React Router 7** for routing and route protection
- **Tailwind CSS 4** for styling (with dark mode via a `dark` class on `<html>`)
- **React Context** for state — see `CLAUDE.md` for the provider architecture

## Contributing

See `CLAUDE.md` and `.claude/rules/` for coding standards, architecture, routing/role
conventions, and git branching/commit conventions used in this repository.
