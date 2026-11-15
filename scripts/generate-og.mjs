/**
 * Generates the 1200x630 Open Graph card images in public/image/og.
 *
 * Run with: npm run og:images
 * Requires Google Chrome (used headlessly to render the cards).
 *
 * Keep the PAGES list in sync with routeSeo (src/data/seo.data.ts),
 * sharedServices / sharedProjects (src/data/site.data.ts) and blogPosts
 * (src/features/blog/data/blog.data.ts) when content changes.
 */
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(PROJECT_ROOT, "public", "image", "og");
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const staticPages = [
  {
    file: "home",
    kicker: "Freelance Developer",
    title: "Websites, apps & AI agents built to deliver",
    subtitle:
      "Helping startups and businesses build modern websites, mobile apps and automation that actually deliver.",
  },
  {
    file: "services",
    kicker: "Services",
    title: "Web, mobile & AI development services",
    subtitle:
      "Design, build, launch and scale with one developer across the full stack.",
  },
  {
    file: "portfolio",
    kicker: "Portfolio",
    title: "Selected work for clients worldwide",
    subtitle: "Web apps, mobile apps, SaaS products and AI platforms.",
  },
  {
    file: "about",
    kicker: "About",
    title: "A client-first developer for modern products",
    subtitle:
      "Full-stack and AI development with clear communication from idea to launch.",
  },
  {
    file: "process",
    kicker: "Process",
    title: "A transparent path from idea to launch",
    subtitle: "Discovery, planning, development, launch and ongoing support.",
  },
  {
    file: "pricing",
    kicker: "Pricing",
    title: "Transparent pricing and fixed quotes",
    subtitle: "Clear scopes, milestone payments and no surprise invoices.",
  },
  {
    file: "faq",
    kicker: "FAQ",
    title: "Answers before you start a project",
    subtitle: "Scope, pricing, timelines, communication and post-launch support.",
  },
  {
    file: "blog",
    kicker: "Blog",
    title: "Ideas, guides and build notes",
    subtitle: "Practical writing on AI, web development and product.",
  },
  {
    file: "contact",
    kicker: "Contact",
    title: "Let's build something that works",
    subtitle:
      "Tell me about your project and get a reply within one business day.",
  },
];

const services = [
  ["web-development", "Web Development", "Fast, responsive websites built to convert"],
  ["mobile-app-development", "Mobile App Development", "iOS and Android apps built to scale"],
  ["ai-agents-automation", "AI Agents & Automation", "AI agents and workflows that save real time"],
  ["chatbot-development", "Chatbot Development", "Smart assistants for web, WhatsApp and more"],
  ["saas-development", "SaaS & Product Development", "Multi-tenant products built for growth"],
  ["ui-ux-design", "UI/UX Design", "Interfaces that look sharp and convert"],
  ["cloud-devops", "Cloud & DevOps", "Reliable hosting, deployments and monitoring"],
  ["digital-marketing", "Digital Marketing", "SEO and content that bring qualified traffic"],
];

const caseStudies = [
  ["voice-agent", "AI Voice Agent Platform", "Conversational AI that handles calls and bookings automatically · USA"],
  ["estate-crm", "Real Estate CRM", "Lead tracking, listings and automation workflows · Canada"],
  ["ecommerce-marketplace", "E-commerce Marketplace", "Multi-vendor marketplace with payments and inventory · Australia"],
  ["healthcare-app", "Healthcare Mobile App", "Appointments, records and telehealth in one app · UK"],
  ["saas-analytics", "SaaS Analytics Platform", "Real-time analytics and custom reporting for product teams · UAE"],
  ["lms", "Learning Management System", "Courses, progress tracking and certificates · Oman"],
];

const blogPosts = [
  ["ai-agents-customer-support", "How AI Agents Are Changing Customer Support for Small Businesses", "Oct 8, 2026"],
  ["react-vs-nextjs-2026", "React vs Next.js in 2026: Choosing the Right Stack", "Sep 22, 2026"],
  ["prepare-for-discovery-call", "What to Prepare Before Your First Discovery Call", "Sep 4, 2026"],
  ["signs-website-needs-rebuild", "5 Signs Your Business Website Needs a Rebuild", "Aug 18, 2026"],
  ["idea-to-mvp-roadmap", "From Idea to MVP: A Practical Roadmap", "Jul 30, 2026"],
];

const pages = [
  ...staticPages,
  ...services.map(([slug, title, subtitle]) => ({
    file: `service-${slug}`,
    kicker: "Service",
    title,
    subtitle,
  })),
  ...caseStudies.map(([slug, title, subtitle]) => ({
    file: `case-${slug}`,
    kicker: "Case Study",
    title,
    subtitle,
  })),
  ...blogPosts.map(([slug, title, date]) => ({
    file: `blog-${slug}`,
    kicker: "Article",
    title,
    subtitle: `Mir Talal Blog · ${date}`,
  })),
];

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const titleSize = (title) => {
  if (title.length <= 34) return 74;
  if (title.length <= 52) return 62;
  if (title.length <= 72) return 54;
  return 48;
};

const cardHtml = (page) => `
  <section class="card">
    <div class="glow glow-a"></div>
    <div class="glow glow-b"></div>
    <div class="dots"></div>
    <header class="top">
      <div class="brand">
        <span class="mark">MT</span>
        <span class="brand-text">
          <strong>Mir Talal</strong>
          <small>Full-Stack &amp; AI Developer</small>
        </span>
      </div>
      <span class="kicker">${escapeHtml(page.kicker)}</span>
    </header>
    <div class="body">
      <span class="accent"></span>
      <h1 style="font-size:${titleSize(page.title)}px">${escapeHtml(page.title)}</h1>
    </div>
    <footer class="bottom">
      <p>${escapeHtml(page.subtitle)}</p>
      <span class="domain">mirtalal.web.app</span>
    </footer>
  </section>`;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #061c33; }
  body {
    width: 1200px;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    position: relative;
    width: 1200px;
    height: 630px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 64px 48px;
    color: #fff;
    background:
      linear-gradient(135deg, #061a30 0%, #092f58 52%, #0b3a6b 100%);
  }
  .glow { position: absolute; border-radius: 999px; filter: blur(90px); }
  .glow-a { width: 460px; height: 460px; top: -190px; right: -110px; background: rgba(22,112,245,.42); }
  .glow-b { width: 380px; height: 380px; bottom: -210px; left: -90px; background: rgba(88,130,232,.28); }
  .dots {
    position: absolute; inset: 0; opacity: .35;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,.20) 1px, transparent 0);
    background-size: 28px 28px;
    -webkit-mask-image: linear-gradient(160deg, #000, transparent 70%);
    mask-image: linear-gradient(160deg, #000, transparent 70%);
  }
  .top { position: relative; display: flex; align-items: flex-start; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .mark {
    display: inline-flex; align-items: center; justify-content: center;
    width: 58px; height: 58px; border-radius: 18px;
    font-size: 17px; font-weight: 800; letter-spacing: .5px;
    background: linear-gradient(135deg, #2B7CFF, #0B3A6B);
    box-shadow: 0 14px 34px rgba(4,20,44,.55);
    border: 1px solid rgba(255,255,255,.18);
  }
  .brand-text { display: flex; flex-direction: column; gap: 3px; }
  .brand-text strong { font-size: 22px; font-weight: 700; letter-spacing: -.2px; }
  .brand-text small { font-size: 14px; color: rgba(191,219,254,.78); letter-spacing: .4px; }
  .kicker {
    padding: 10px 20px; border-radius: 999px;
    font-size: 13px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
    color: #BFDBFE; background: rgba(255,255,255,.07);
    border: 1px solid rgba(147,197,253,.32);
  }
  .body { position: relative; display: flex; gap: 24px; align-items: stretch; max-width: 1010px; }
  .accent { width: 6px; border-radius: 999px; background: linear-gradient(180deg, #60A5FA, #1670F5); flex: 0 0 6px; }
  h1 { font-weight: 700; line-height: 1.06; letter-spacing: -1.6px; color: #F8FAFF; }
  .bottom {
    position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 40px;
    border-top: 1px solid rgba(255,255,255,.16); padding-top: 22px;
  }
  .bottom p { max-width: 760px; font-size: 19px; line-height: 1.45; color: rgba(226,238,255,.74); }
  .domain { font-size: 16px; font-weight: 600; letter-spacing: .08em; color: #93C5FD; white-space: nowrap; }
</style>
</head>
<body>${pages.map(cardHtml).join("")}</body>
</html>`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

async function main() {
  if (!existsSync(CHROME)) {
    throw new Error(
      `Chrome not found at "${CHROME}". Set CHROME_PATH to your Chrome executable.`,
    );
  }

  const temp = await mkdtemp(path.join(tmpdir(), "og-cards-"));
  const htmlPath = path.join(temp, "cards.html");
  await writeFile(htmlPath, html, "utf8");
  await mkdir(OUT_DIR, { recursive: true });

  const port = 9350;
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--force-device-scale-factor=1",
      "--window-size=1200,1000",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${path.join(temp, "profile")}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "ignore" },
  );

  let socket;
  try {
    let target;
    for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
      await wait(250);
      try {
        const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
        target = targets.find((item) => item.type === "page");
      } catch {
        // Chrome is still starting up.
      }
    }
    if (!target) throw new Error("Could not connect to headless Chrome.");

    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });

    let nextId = 1;
    const pending = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      const entry = pending.get(message.id);
      if (!entry) return;
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
    });
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });

    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1200,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await wait(1200);

    for (const [index, page] of pages.entries()) {
      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: index * 630, width: 1200, height: 630, scale: 1 },
      });
      await writeFile(
        path.join(OUT_DIR, `${page.file}.png`),
        Buffer.from(data, "base64"),
      );
      console.log(`✓ ${page.file}.png`);
    }
  } finally {
    socket?.close();
    chrome.kill();
    await new Promise((resolve) => chrome.once("exit", resolve));
    await rm(temp, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 200,
    }).catch(() => {
      // Chrome sometimes keeps the profile locked on Windows; the temp dir
      // is safe to leave behind, and it never touches the project.
    });
  }

  console.log(`\nGenerated ${pages.length} OG images in public/image/og`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
