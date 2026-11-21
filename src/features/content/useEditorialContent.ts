import { useSyncExternalStore } from "react";
import { Bot, Code2, Gauge, Rocket, ClipboardList, PenLine, type LucideIcon } from "lucide-react";
import { apiUrl } from "../admin/api/client";
import { blogPosts as fallbackBlogPosts, type BlogPost } from "../blog/data/blog.data";
import { caseStudies as fallbackCaseStudies, type CaseStudy } from "../portfolio/data/case-studies.data";

export type SiteBlogPost = BlogPost & {
  coverImage?: string;
  coverImageAlt?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
};

export type SiteCaseStudy = CaseStudy & {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  body: string;
  projectType: string;
  clientCompany: string;
  clientName: string;
  clientRole: string;
  clientWebsite: string;
  managedByCms: boolean;
};

type BlogRow = {
  slug: string; title: string; excerpt: string; cover_image: string; cover_image_alt: string;
  body: string; icon: string; category: string; author_name: string; author_role: string;
  author_avatar: string; created_at: string; updated_at: string;
};

type CaseStudyRow = {
  id: number; slug: string; title: string; excerpt: string; cover_image: string; cover_image_alt: string;
  body: string; icon: string; project_type: string; client_company: string; client_name: string;
  client_role: string; client_website: string; challenge: string; solution: string; results: string;
  created_at: string; updated_at: string;
};

const iconMap: Record<string, LucideIcon> = {
  bot: Bot, code2: Code2, gauge: Gauge, rocket: Rocket, "clipboard-list": ClipboardList, "pen-line": PenLine,
};
const coverClasses = [
  "from-[#0f3d6e] via-[#092f58] to-[#06172D]",
  "from-[#0e2f58] via-[#12427A] to-[#0b2f52]",
  "from-[#144e78] via-[#0b3a63] to-[#071f38]",
];

function parseArticle(body: string, excerpt: string) {
  const sections: BlogPost["sections"] = [];
  let heading = "Article";
  let paragraphs: string[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (paragraphs.length || bullets.length) sections.push({ heading, paragraphs, ...(bullets.length ? { bullets } : {}) });
    paragraphs = [];
    bullets = [];
  };

  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ") || line.startsWith("### ")) {
      flush();
      heading = line.replace(/^#{2,3}\s+/, "");
    } else if (/^[-*]\s+/.test(line)) {
      bullets.push(line.replace(/^[-*]\s+/, ""));
    } else {
      paragraphs.push(line.replace(/^#\s+/, ""));
    }
  }
  flush();
  const intro = sections[0]?.paragraphs.shift() || excerpt;
  return { intro, sections: sections.filter((section) => section.paragraphs.length || section.bullets?.length) };
}

function readTime(text: string) {
  return `${Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200))} min read`;
}

function mapBlog(row: BlogRow, index: number): SiteBlogPost {
  const article = parseArticle(row.body || row.excerpt, row.excerpt);
  const date = new Date(row.updated_at || row.created_at);
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: validDate.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" }),
    dateTime: validDate.toISOString().slice(0, 10),
    readTime: readTime(row.body || row.excerpt),
    Icon: iconMap[row.icon] ?? PenLine,
    coverClass: coverClasses[index % coverClasses.length],
    coverImage: row.cover_image,
    coverImageAlt: row.cover_image_alt,
    authorName: row.author_name,
    authorRole: row.author_role,
    authorAvatar: row.author_avatar,
    ...article,
    takeaways: [],
  };
}

const fallbackStudies: SiteCaseStudy[] = fallbackCaseStudies.map((study) => ({
  ...study,
  slug: study.id,
  title: study.id,
  excerpt: study.overview,
  coverImage: "",
  coverImageAlt: "",
  body: study.overview,
  projectType: study.industry,
  clientCompany: "",
  clientName: "",
  clientRole: "",
  clientWebsite: "",
  managedByCms: false,
}));

let posts: SiteBlogPost[] = fallbackBlogPosts;
let studies: SiteCaseStudy[] = fallbackStudies;
let loaded = false;
let started = false;
let blogSnapshot = { data: posts, loaded, remote: false };
let caseSnapshot = { data: studies, loaded, remote: false };
let blogRemote = false;
let caseRemote = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

async function load() {
  try {
    const [blogResponse, caseResponse] = await Promise.all([
      fetch(apiUrl("/api/blog"), { headers: { Accept: "application/json" } }),
      fetch(apiUrl("/api/case-studies"), { headers: { Accept: "application/json" } }),
    ]);
    const [blogPayload, casePayload] = await Promise.all([
      blogResponse.ok ? blogResponse.json() : null,
      caseResponse.ok ? caseResponse.json() : null,
    ]);
    if (Array.isArray(blogPayload?.data)) {
      const remoteRows = blogPayload.data as BlogRow[];
      const remotePosts: SiteBlogPost[] = remoteRows.map((row, index) => mapBlog(row, index));
      const remoteSlugs = new Set(remotePosts.map((post) => post.slug));
      posts = [...remotePosts, ...fallbackBlogPosts.filter((post) => !remoteSlugs.has(post.slug))];
      blogRemote = true;
    }
    if (Array.isArray(casePayload?.data)) {
      const remoteRows = casePayload.data as CaseStudyRow[];
      const remoteStudies: SiteCaseStudy[] = remoteRows.map((row) => {
        const tags = row.project_type.split(/[,|]/).map((tag) => tag.trim()).filter(Boolean);
        return {
          id: row.slug, slug: row.slug, title: row.title, excerpt: row.excerpt,
          coverImage: row.cover_image, coverImageAlt: row.cover_image_alt,
          body: row.body,
          industry: row.project_type || "Project", year: new Date(row.updated_at).getFullYear().toString(),
          duration: "", services: tags, overview: row.body || row.excerpt,
          challenge: row.challenge, challengePoints: [], solution: row.solution,
          solutionPoints: [], stack: [], results: row.results ? [{ value: row.results, label: "Results" }] : [],
          deliverables: [], testimonialId: "", projectType: row.project_type,
          clientCompany: row.client_company, clientName: row.client_name,
          clientRole: row.client_role, clientWebsite: row.client_website,
          managedByCms: true,
        };
      });
      const remoteSlugs = new Set(remoteStudies.map((study) => study.slug));
      studies = [...remoteStudies, ...fallbackStudies.filter((study) => !remoteSlugs.has(study.slug))];
      caseRemote = true;
    }
  } catch {
    // Keep the checked-in content available if the API is unreachable.
  } finally {
    loaded = true;
    blogSnapshot = { data: posts, loaded, remote: blogRemote };
    caseSnapshot = { data: studies, loaded, remote: caseRemote };
    emit();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!started) { started = true; void load(); }
  return () => listeners.delete(listener);
}

export function useBlogPosts() {
  return useSyncExternalStore(subscribe, () => blogSnapshot, () => blogSnapshot);
}

export function useCaseStudies() {
  return useSyncExternalStore(subscribe, () => caseSnapshot, () => caseSnapshot);
}
