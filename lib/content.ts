export const SITE = {
  name: "Dhruv Chandrawanshi",
  shortName: "Dhruv",
  domain: "dhruvdeveloper.me",
  url: "https://dhruvdeveloper.me",
  tagline: "AI builds. I direct. The internet listens.",
  description:
    "Dhruv Chandrawanshi — I ship websites, Telegram bots, and AI automations. Built fast, polished hard, deployed on my own metal.",
  email: "dxruxx@gmail.com",
  whatsapp: "+919540693239",
  whatsappDisplay: "+91 95406 93239",
  whatsappLink: "https://wa.me/919540693239",
  linkedin: "https://www.linkedin.com/in/dhruv-chandrawanshi-31844b3bb/",
  twitter: "",
  instagram: "",
  github: "",
  location: "India",
  available: true,
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES_MARQUEE = [
  "Web Development",
  "AI Automation",
  "Telegram Bots",
  "VPS Hosting",
  "UI / UX Design",
  "End-to-End Deployment",
];

export type Project = {
  id: string;
  year: string;
  title: string;
  type: string;
  stack: string;
  description: string;
  href: string;
  accent: "violet" | "pink" | "amber" | "cyan";
};

export const PROJECTS: Project[] = [
  {
    id: "dema",
    year: "2025",
    title: "Dema Studio",
    type: "Agency · Marketing site",
    stack: "Next.js · Tailwind · Motion",
    description:
      "Digital studio site with bold typography, section-by-section storytelling and smooth motion. Built end-to-end — copy, layout, polish.",
    href: "https://dema-gamma.vercel.app/",
    accent: "violet",
  },
  {
    id: "vivek",
    year: "2025",
    title: "Dr. Vivek Gogia",
    type: "Healthcare · Service site",
    stack: "Next.js · Tailwind",
    description:
      "Full-service ENT clinic site for a Delhi specialist. Designed and shipped end-to-end, optimised for local SEO and WhatsApp lead capture.",
    href: "https://dr-vivek-gogia.vercel.app/",
    accent: "pink",
  },
  {
    id: "petvet",
    year: "2025",
    title: "PetVet",
    type: "Veterinary · Service site",
    stack: "Next.js · Tailwind",
    description:
      "Pet clinic site with online booking flow and service catalog. Soft minimal design tuned for pet owners.",
    href: "https://petvet-lilac.vercel.app/",
    accent: "amber",
  },
];

export const TOOL_CATEGORIES = [
  {
    title: "AI Builders",
    accent: "violet" as const,
    tools: ["Cursor", "v0", "Lovable", "Claude", "ChatGPT", "Devin"],
  },
  {
    title: "Frontend",
    accent: "pink" as const,
    tools: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "GSAP"],
  },
  {
    title: "Automation",
    accent: "amber" as const,
    tools: ["Telegram Bot API", "n8n", "Make", "OpenAI API", "Groq", "Webhooks"],
  },
  {
    title: "Infra & Deploy",
    accent: "cyan" as const,
    tools: ["Ubuntu VPS", "Docker", "Nginx", "Cloudflare", "PM2", "Vercel"],
  },
];

export const SERVICES = [
  {
    number: "01",
    title: "Websites",
    blurb: "AI-built. Hand-polished. Production-ready.",
    bullets: [
      "Discovery → Design → Build → Deploy",
      "Static-first for speed; CMS if you need it",
      "Hosted on my VPS or Vercel — your call",
    ],
    accent: "violet" as const,
  },
  {
    number: "02",
    title: "Telegram Bots",
    blurb: "Custom flows for support, sales, payments, scraping.",
    bullets: [
      "Built fast, deployed on always-on infra",
      "Webhook + long-polling, your pick",
      "Payments, scraping, AI replies, broadcasts",
    ],
    accent: "pink" as const,
  },
  {
    number: "03",
    title: "AI Automation",
    blurb: "Workflows that connect your apps and ship results.",
    bullets: [
      "n8n / Make / custom Python — whichever fits",
      "Chatbots tuned to your data",
      "Pipelines that wake you up only when needed",
    ],
    accent: "amber" as const,
  },
  {
    number: "04",
    title: "VPS Setup & Hosting",
    blurb: "Provision, secure, deploy. SSL, Docker, Nginx, monitoring.",
    bullets: [
      "Ubuntu hardening + firewall + fail2ban",
      "Docker compose, Nginx reverse proxy, certbot",
      "Uptime monitoring + log rotation + backups",
    ],
    accent: "cyan" as const,
  },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Brief", text: "Understand goals & audience." },
  { num: "02", title: "Design", text: "Wireframe and lock the look." },
  { num: "03", title: "Build", text: "AI-direct the build, iterate fast." },
  { num: "04", title: "Polish", text: "Animations, responsive, a11y." },
  { num: "05", title: "Deploy", text: "Vercel or your VPS, SSL & ready." },
];
