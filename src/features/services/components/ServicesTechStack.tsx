import {
  servicesTechCopy,
  servicesTechStack,
  servicesAllTech,
} from "../data/services-page.data";
import SectionHeading from "../../../components/shared/SectionHeading";
import Reveal from "../../../components/shared/Reveal";
import {
  innerContainerClass,
  innerSectionClass,
} from "../../../components/shared/section.styles";

// Heights account for internal padding so every logo renders at a matching optical size.
const logoHeights: Record<string, number> = {
  "react.webp": 30,
  "nextjs.webp": 29,
  "vue.webp": 27,
  "tailwindcss.webp": 32,
  "laravel.webp": 25,
  "nodejs.webp": 26,
  "php.webp": 34,
  "django.webp": 50,
  "flutter.webp": 27,
  "reactnative.webp": 27,
  "android.webp": 27,
  "ios.webp": 26,
  "mysql.webp": 32,
  "postgresql.webp": 26,
  "mongodb.webp": 24,
  "redis.webp": 25,
  "aws.webp": 25,
  "docker.webp": 26,
  "github.webp": 25,
  "cicd.webp": 26,
  "figma.svg": 24,
  "git.svg": 24,
  "jira.svg": 24,
  "slack.svg": 24,
};

function logoHeight(logo: string) {
  return logoHeights[logo.split("/").pop() ?? ""] ?? 26;
}

export default function ServicesTechStack() {
  return (
    <section
      aria-labelledby="tech-stack-title"
      className={`${innerSectionClass} bg-[#F7FAFF]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full bg-[#DCE9FF]/60 blur-3xl motion-safe:animate-float-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#EAF2FF] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D6E4F7_1px,transparent_1px)] bg-[size:26px_26px] opacity-30"
      />

      <div className={`relative z-10 ${innerContainerClass}`}>
        <Reveal>
          <SectionHeading
            titleId="tech-stack-title"
            eyebrow={servicesTechCopy.eyebrow}
            title={servicesTechCopy.title}
            description={servicesTechCopy.description}
          />
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {servicesTechStack.map((tech, index) => (
            <li key={tech.id} className="min-w-0">
              <Reveal delay={(index % 4) * 70} className="h-full">
                <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[1.25rem] border border-[#E6EEF9] bg-white px-4 py-5 text-center shadow-[0_8px_24px_rgba(15,48,91,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#BFD6F5] hover:shadow-[0_20px_44px_rgba(15,48,91,0.11)] sm:px-5 sm:py-6">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1670F5] to-[#93C5FD] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E6EEF9] bg-[#F7FAFF] transition duration-300 group-hover:border-[#C9DEFF] group-hover:bg-[#EAF2FF]">
                    <img
                      src={tech.logo}
                      alt=""
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="h-9 w-9 object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
                    />
                  </span>

                  <h3 className="mt-4 font-montserrat text-sm font-bold text-[#10234B] sm:text-base">
                    {tech.name}
                  </h3>
                  <p className="mt-1.5 flex-1 font-inter text-xs leading-relaxed text-[#5B7291]">
                    {tech.description}
                  </p>
                  <span className="mt-3 inline-flex items-center rounded-full bg-[#EAF2FF] px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1670F5]">
                    {tech.category}
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={80}>
          <div className="mt-10 rounded-[1.5rem] border border-[#E6EEF9] bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,48,91,0.05)] backdrop-blur sm:mt-12 sm:p-6">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="font-montserrat text-lg font-bold text-[#10234B] sm:text-xl">
                  All Technologies
                </h3>
                <p className="mt-1 font-inter text-xs leading-relaxed text-[#5B7291] sm:text-sm">
                  The complete toolkit behind every project, from frontend to deployment.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#EAF2FF] px-3 py-1.5 font-inter text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1670F5]">
                {servicesAllTech.length} tools
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3 sm:gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {servicesAllTech.map((tech) => (
                <li key={tech.id} className="min-w-0">
                  <div className="group flex h-full flex-col items-center justify-center rounded-2xl border border-[#E6EEF9] bg-white px-3 py-4 text-center transition duration-300 hover:-translate-y-0.5 hover:border-[#BFD6F5] hover:shadow-[0_14px_30px_rgba(15,48,91,0.08)]">
                    <span className="flex h-14 w-full items-center justify-center">
                      <img
                        src={tech.logo}
                        alt=""
                        style={{ height: logoHeight(tech.logo) + "px" }}
                        loading="lazy"
                        decoding="async"
                        className="w-auto max-w-full object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-3 font-inter text-[11px] font-semibold leading-tight text-[#33486A] sm:text-xs">
                      {tech.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-2xl border-t border-[#E6EEF9] pt-5 text-center font-inter text-xs leading-relaxed text-[#526987] sm:text-sm">
            Every stack is chosen for performance, security and easy
            maintenance.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
