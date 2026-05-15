# Job Tracker

A simple, lightweight job application tracker built with Next.js. Store and manage your job applications locally in your browser — no backend, no accounts, no setup.

## Features

- **Add applications** — Company name, job role, link, location, date, source, status, and notes
- **Status tracking** — Need to Apply, Applied, Interview, Rejected, Offer
- **Filter by status** — Quick filter tabs with counts
- **Notes** — Hover over the note icon to see details without leaving the table
- **Edit & Delete** — Manage your applications inline
- **LocalStorage** — All data stored in your browser, works offline

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Lucide React](https://lucide.dev/) — Icons
- localStorage — Data persistence

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Storage

All data is stored in your browser's localStorage under the key `job-applications`. This means:

- No server or database needed
- Works completely offline
- Data is tied to your browser — clearing browser data will delete your applications
- No sync across devices

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main dashboard
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ApplicationForm.tsx   # Add/Edit form (dialog)
│   ├── ApplicationTable.tsx  # Applications table
│   └── ui/                   # shadcn/ui components
── lib/
    ├── store.ts          # localStorage CRUD operations
    └── types.ts          # TypeScript types
```

