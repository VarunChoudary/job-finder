# Job Finder

Remote job discovery and resume tools for people working from India.

## Features
- India-eligible remote job search using public employer feeds
- Resume import (PDF, DOCX, TXT), local checks, editing, Word export and PDF printing
- Optional Groq-powered tailoring, with consent and factual-output checks
- Local resume-to-job keyword matching
- Saved jobs, applied markers and CSV tracker export

## Development
Requires Node.js 22.13+ and pnpm (version pinned in package.json).

```sh
corepack enable
pnpm install
pnpm dev
```

Run checks with `node --test tests/*.test.mjs` and `pnpm exec tsc --noEmit`.
Build with `pnpm build`.

## Secrets
Configure GROQ_API_KEY as a server-side secret. GROQ_MODEL defaults to openai/gpt-oss-120b. Never put keys in frontend code, variable names, commits, or screenshots. AI provider limits apply.

## Backup and recovery
This repository is the GitHub source backup. Initial snapshot matches published source commit 73156f15e9e9365c7d5d99e28214aba7580510e6, excluding hosting identity and private operational notes. Prior deployment history remains in the original Sites source repository.

After each major update, test, scan for secrets, commit and push to this repository, then verify the remote commit. This workflow runs when working on the project; it is not a background scheduler.

Hosting identity is deliberately omitted from .openai/hosting.json. Restore the existing Site project ID through its authorized hosting workflow before deploying to Sites. Independent hosting needs its own deployment configuration.

Saved jobs live in each visitor's browser. GitHub backs up code, not visitor data or runtime secrets.
