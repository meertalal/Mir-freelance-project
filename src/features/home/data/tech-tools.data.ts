import {
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";

export const techToolsCopy = {
  eyebrow: "Technologies & Tools",
  title: "The Tools I Use to Build",
  description:
    "A modern and reliable tech stack to develop scalable, secure and high-performing digital solutions.",
} as const;

export const techToolCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Build modern, responsive and user-friendly interfaces.",
    Icon: Code2,
    tools: [
      { id: "react", name: "React", color: "#61DAFB", bg: "#E8F9FE" },
      { id: "next", name: "Next.js", color: "#111111", bg: "#F3F4F6" },
      { id: "vue", name: "Vue.js", color: "#42B883", bg: "#E8F8F1" },
      { id: "tailwind", name: "Tailwind", color: "#38BDF8", bg: "#E8F6FE" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Powerful and secure server-side development for scalable applications.",
    Icon: Server,
    tools: [
      { id: "laravel", name: "Laravel", color: "#FF2D20", bg: "#FEECEC" },
      { id: "node", name: "Node.js", color: "#339933", bg: "#EAF6EA" },
      { id: "php", name: "PHP", color: "#777BB4", bg: "#EEEFF6" },
      { id: "django", name: "Django", color: "#092E20", bg: "#E8F3EC" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with great performance and native experience.",
    Icon: Smartphone,
    tools: [
      { id: "flutter", name: "Flutter", color: "#02569B", bg: "#E6F1F8" },
      { id: "react-native", name: "React Native", color: "#61DAFB", bg: "#E8F9FE" },
      { id: "android", name: "Android", color: "#3DDC84", bg: "#E9FBF1" },
      { id: "ios", name: "iOS", color: "#111111", bg: "#F3F4F6" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description:
      "Reliable and high-performance data management for your applications.",
    Icon: Database,
    tools: [
      { id: "mysql", name: "MySQL", color: "#00758F", bg: "#E6F3F6" },
      { id: "postgres", name: "PostgreSQL", color: "#336791", bg: "#EAF0F5" },
      { id: "mongo", name: "MongoDB", color: "#47A248", bg: "#EBF6EC" },
      { id: "redis", name: "Redis", color: "#DC382D", bg: "#FBEDEC" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description:
      "Deploy, scale and maintain applications with modern DevOps practices.",
    Icon: Cloud,
    tools: [
      { id: "aws", name: "AWS", color: "#FF9900", bg: "#FFF4E5" },
      { id: "docker", name: "Docker", color: "#2496ED", bg: "#E8F4FD" },
      { id: "github", name: "GitHub", color: "#181717", bg: "#F3F4F6" },
      { id: "cicd", name: "CI/CD", color: "#2563EB", bg: "#E8EEFE" },
    ],
  },
  {
    id: "others",
    title: "Tools & Others",
    description:
      "Productivity and collaboration tools for efficient development and project delivery.",
    Icon: Wrench,
    tools: [
      { id: "figma", name: "Figma", color: "#F24E1E", bg: "#FEEEE9" },
      { id: "git", name: "Git", color: "#F05032", bg: "#FEECEA" },
      { id: "jira", name: "Jira", color: "#0052CC", bg: "#E6EEF9" },
      { id: "slack", name: "Slack", color: "#4A154B", bg: "#F3E8F4" },
    ],
  },
] as const;
