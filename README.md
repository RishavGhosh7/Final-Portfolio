# Final-Portfolio

Personal portfolio of Rishav Ghosh, software engineer. Built with React, Vite, React Router, and Framer Motion.

Pages: Home, Work (with a case study for each main project), About (education, skills, achievements, LeetCode badges), and Contact.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
```

Output goes to `dist/`. `vercel.json` rewrites routes to `index.html` so direct links such as `/projects/core-x` work on Vercel.

## Editing content

All text, links, projects, skills, education, and badges live in `src/data/profile.js`. Badge images are in `public/badges/`, and the resume PDF is `public/Rishav_Ghosh.pdf`.
