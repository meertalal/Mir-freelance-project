import Reveal from "../../../components/shared/Reveal";
import { innerContainerClass } from "../../../components/shared/section.styles";
import {
  portfolioIndustries,
  portfolioIndustriesCopy,
} from "../data/portfolio-page.data";

export default function PortfolioIndustries() {
  return (
    <section
      aria-labelledby="portfolio-industries-title"
      className="relative w-full border-y border-[#E6EEF9] bg-white px-4 py-6 min-[480px]:px-5 sm:px-6 sm:py-8 lg:px-8 xl:px-12"
    >
      <div
        className={`${innerContainerClass} flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8`}
      >
        <Reveal className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className="mt-1 h-10 w-1 shrink-0 rounded-full bg-[linear-gradient(180deg,#1670F5,#8FB8FF)]"
          />
          <div>
            <h2
              id="portfolio-industries-title"
              className="font-playfair text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1670F5]"
            >
              {portfolioIndustriesCopy.eyebrow}
            </h2>
            <p className="mt-1.5 max-w-lg font-inter text-sm leading-relaxed text-[#526987]">
              {portfolioIndustriesCopy.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {portfolioIndustries.map(({ id, label, Icon }) => (
              <li key={id}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE9FF] bg-[#F7FAFF] px-3 py-1.5 font-inter text-[11px] font-semibold text-[#0F3D6E] transition-colors duration-300 hover:border-[#AFCBF3] hover:bg-white sm:px-3.5 sm:text-xs">
                  <Icon
                    size={14}
                    strokeWidth={1.9}
                    aria-hidden="true"
                    className="text-[#1670F5]"
                  />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
