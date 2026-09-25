export const profile = {
  name: "Rishav Ghosh",
  role: "Software Engineer",
  lead:
    "Full-stack engineer shipping AI systems: task agents, resume analysis, and spend workflows.",
  location: "Kolkata, India",
  email: "risgho21@gmail.com",
  phone: "+91 89105 74516",
  phoneHref: "tel:+918910574516",
  resume: "/Rishav_Ghosh.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/RishavGhosh7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rishav-ghosh-rg7/" },
    { label: "LeetCode", href: "https://leetcode.com/u/ZgTmaEq5sv/" },
    { label: "HackerRank", href: "https://www.hackerrank.com/profile/rishavghosh21nov" },
  ],
};

export const projects = [
  {
    slug: "productivity-agent",
    index: "01",
    kicker: "AI agent",
    title: "AI-Powered Personal Productivity Agent",
    short: "Conversational task agent with Redis-backed reminder escalation.",
    summary:
      "A full-stack agent for deadline tracking across five or more task categories, with recurring rules and multi-stage reminders that cut manual planning effort by 60%.",
    metrics: [
      { value: "60%", label: "Less manual planning" },
      { value: "<1.5s", label: "Average inference" },
      { value: "5+", label: "Task categories" },
    ],
    sections: [
      {
        heading: "Conversational task creation",
        body:
          "Self-hosted Mistral 7B through the Ollama REST API classifies intent and extracts structured JSON at temperature 0. Every response is schema-validated before it becomes a task, so a sentence like \"pay rent on the 5th every month\" turns into a recurring bill.",
      },
      {
        heading: "Scheduling that survives restarts",
        body:
          "A Redis-backed engine escalates reminders at five days, one day, and the same day, syncs due dates to a calendar, and recovers persisted jobs so concurrent workflows keep running after a restart.",
      },
      {
        heading: "What it covers",
        body:
          "Bills, subscriptions, assignments, study sessions, and to-dos, each with due dates, recurrence rules, and overdue escalation.",
      },
    ],
    stack: ["Spring Boot", "React", "Mistral 7B", "Ollama", "Redis", "PostgreSQL"],
    links: [{ label: "Repository", href: "https://github.com/RishavGhosh7/AI-powered-personal-assistant-" }],
  },
  {
    slug: "resume-copilot",
    index: "02",
    kicker: "Resume analysis",
    title: "AI Resume Copilot",
    short: "ATS scoring and job-description matching in under three seconds.",
    summary:
      "An analyzer and optimizer that scores resumes for ATS compatibility, keywords, and skill relevance, and returns a feedback report in under three seconds.",
    metrics: [
      { value: "<3s", label: "Feedback reports" },
      { value: "85%", label: "Alignment scoring in testing" },
      { value: "70%", label: "Less manual review" },
    ],
    sections: [
      {
        heading: "Matching resumes to roles",
        body:
          "Parsing and job-description matching extract and analyze 50+ technical and soft skills, then score how closely a resume lines up with the role.",
      },
      {
        heading: "Feedback people can act on",
        body:
          "A responsive dashboard takes an upload and returns AI-generated improvement suggestions, cutting manual resume review time by 70%.",
      },
      {
        heading: "Built to handle load",
        body:
          "Serverless deployment on Vercel handled 100+ concurrent analyses and held 99% uptime during testing.",
      },
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "OpenAI SDK", "Vercel"],
    links: [
      { label: "Live app", href: "https://ai-resume-copilot-2.vercel.app" },
      { label: "Repository", href: "https://github.com/RishavGhosh7/AI-resume-copilot-2" },
    ],
  },
  {
    slug: "core-x",
    index: "03",
    kicker: "Fintech",
    title: "Core-X",
    short: "Amex-aligned spend and expense app with an agentic concierge.",
    summary:
      "An Amex-aligned payments and expense app: one interface for spend, expenses, and personalized offers, with an agent that turns intent into a decision.",
    sections: [
      {
        heading: "An agentic spend workflow",
        body:
          "User intent becomes an actionable decision. REST APIs cover intents, expenses, receipts, offers, and application bootstrapping.",
      },
      {
        heading: "Receipts to expenses",
        body:
          "Receipt upload and automated expense processing run through Express and Multer, on a PostgreSQL-aligned data model designed for durable storage.",
      },
      {
        heading: "A concierge that never goes silent",
        body:
          "An LLM concierge runs through OpenRouter with deterministic fallback replies when the model is unavailable. The production app is deployed on Vercel.",
      },
    ],
    stack: ["React", "Vite", "Node.js", "Express", "Multer", "PostgreSQL", "OpenRouter"],
    links: [
      { label: "Live app", href: "https://core-x-app-1.vercel.app/" },
      { label: "Repository", href: "https://github.com/RishavGhosh7/Core-X-app" },
    ],
  },
];

export const otherProjects = [
  {
    title: "Online Banking System",
    description: "Auth, accounts, transfers, fraud controls, and event-driven architecture.",
    stack: ["Java", "Spring Boot", "MySQL", "Redis", "Kafka", "Docker"],
    href: "https://github.com/RishavGhosh7/online-banking-system-",
    linkLabel: "Repository",
  },
  {
    title: "Navigation Assistant",
    description: "Map search, route guidance, and voice-guided directions.",
    stack: ["React", "Vite", "Node.js", "Express", "Leaflet", "OpenStreetMap"],
    href: "https://navigation-assistant-three.vercel.app",
    linkLabel: "Live app",
  },
  {
    title: "URL Shortener",
    description: "Shortening service with a web interface.",
    stack: ["JavaScript", "Node.js", "HTML", "CSS"],
    href: "https://github.com/RishavGhosh7/url-shortener-service-webapp",
    linkLabel: "Repository",
  },
  {
    title: "AI Movie Recommendations",
    description: "AI-assisted movie discovery.",
    stack: ["React", "Vite", "AI APIs"],
    href: "https://68ec17df2bc0b31cc32f1a58--cheery-mooncake-1ca16c.netlify.app/",
    linkLabel: "Live app",
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["JavaScript", "Java", "CSS", "SQL"],
  },
  {
    label: "Frameworks",
    items: ["React", "Node.js", "Spring Boot", "Express.js", "Redux", "JUnit"],
  },
  {
    label: "AI",
    items: ["LLMs", "RAG", "LangChain", "Vector databases", "Ollama", "Generative AI", "Prompt engineering"],
  },
  {
    label: "Data and infrastructure",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Docker", "Kubernetes", "CI/CD", "Microservices", "REST APIs"],
  },
];

export const education = [
  {
    school: "Woolf University (ECTS)",
    place: "Malta, Europe",
    credential: "MSc in Computer Science",
    status: "In progress",
    year: "2027",
  },
  {
    school: "KIIT University (DU)",
    place: "Bhubaneswar, India",
    credential: "B.Tech in Electronics and Telecommunication Engineering",
    year: "2024",
  },
];

export const leetcodeBadges = {
  annual: [
    { name: "100 Days Badge 2026", image: "/badges/100-days.png", date: "2026-07-30" },
    { name: "50 Days Badge 2026", image: "/badges/50-days.png", date: "2026-06-10" },
  ],
  daily: [
    { name: "Aug 2026", image: "/badges/aug-2026.png", date: "2026-08-31" },
    { name: "Jul 2026", image: "/badges/jul-2026.png", date: "2026-07-31" },
    { name: "Jun 2026", image: "/badges/jun-2026.png", date: "2026-06-30" },
    { name: "May 2026", image: "/badges/may-2026.png", note: "Active on profile" },
  ],
};

export const achievements = [
  "Delivered production-ready systems from design through development to deployment on Vercel and Render.",
  "Earned multiple LeetCode challenge badges for consistently solving DSA problems.",
  "Earned a 5-star rating in Java on HackerRank.",
];
