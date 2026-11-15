import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type SharedProject = {
  id: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  tags: readonly string[] | string[];
  country?: string;
  flag: string;
  href: string;
};

type PortfolioProject = SharedProject & { category?: string };

type PortfolioProjectCardProps = {
  project: PortfolioProject;
};

const categoryLabels: Record<string, string> = {
  web: "Web Application",
  mobile: "Mobile App",
  saas: "SaaS Platform",
};

export default function PortfolioProjectCard({
  project,
}: PortfolioProjectCardProps) {
  const category = project.category ? categoryLabels[project.category] : undefined;

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-[#E1EAF6] bg-white shadow-[0_10px_30px_rgba(15,48,91,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#B8D2F4] hover:shadow-[0_22px_50px_rgba(15,48,91,0.13)]">
      <Link
        to={project.href}
        aria-label={`View ${project.title}`}
        className="relative block overflow-hidden bg-[#EAF2FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5882E8]"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#06172D]/60 to-transparent"
        />

        {category && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 font-inter text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B2C55] shadow-[0_6px_16px_rgba(6,23,45,0.18)] backdrop-blur-sm">
            {category}
          </span>
        )}

        {project.country && (
          <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#06172D]/55 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            <img
              src={project.flag}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 rounded-full object-cover ring-1 ring-white/50"
            />
            {project.country}
          </span>
        )}

        <span
          aria-hidden="true"
          className="absolute bottom-3.5 right-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0B2C55] opacity-0 shadow-md backdrop-blur-sm transition duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight size={16} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-montserrat text-base font-bold leading-snug text-[#10234B] sm:text-lg">
          <Link
            to={project.href}
            className="transition-colors duration-200 hover:text-[#1456C0] group-hover:text-[#1456C0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5882E8]"
          >
            {project.title}
          </Link>
        </h3>

        {project.description && (
          <p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-[#5B7291] sm:text-sm">
            {project.description}
          </p>
        )}

        <ul className="mb-5 mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#E1EAF6] bg-[#F7FAFF] px-2.5 py-1 font-inter text-[10px] font-semibold text-[#526987] sm:text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EDF3FB] pt-4">
          <Link
            to={project.href}
            className="inline-flex min-h-11 items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B2C55] transition-colors hover:text-[#1670F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5882E8]"
          >
            View Case Study
          </Link>
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DCE7F5] text-[#0B2C55] transition duration-300 group-hover:border-[#0B2C55] group-hover:bg-[#0B2C55] group-hover:text-white"
          >
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}
