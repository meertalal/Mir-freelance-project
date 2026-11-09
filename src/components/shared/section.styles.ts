const rail = `
  mx-auto w-full
  max-w-[1280px]
  min-[1440px]:max-w-[1360px]
  min-[1600px]:max-w-[1480px]
  min-[1920px]:max-w-[1680px]
  min-[2560px]:max-w-[1920px]
`.trim();

export const innerSectionClass = `
  relative isolate w-full overflow-hidden
  px-4 py-10
  min-[480px]:px-5
  sm:px-6 sm:py-14
  lg:px-8 lg:py-16
  xl:px-12 xl:py-20
  min-[1920px]:px-16 min-[1920px]:py-24
`.trim();

export const innerContainerClass = rail;

export const contentRailClass = rail;

export const pageHeroGridClass = `
  ${rail}
  relative z-10 grid items-start gap-10
  md:gap-12
  lg:grid-cols-2 lg:items-center lg:gap-12
  xl:gap-16
`.trim();

export const pageHeroCopyClass = `
  motion-safe:animate-page-reveal
  relative isolate rounded-2xl bg-white/85 p-4 shadow-sm backdrop-blur-sm
  sm:bg-white/70 sm:backdrop-blur-[2px]
  lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none
`.trim();

export const pageHeroMediaClass = `
  relative mx-auto w-full max-w-md
  motion-safe:animate-page-reveal
  lg:max-w-lg
  min-[1920px]:max-w-xl
`.trim();

export const pageHeroTitleClass = `
  max-w-xl font-montserrat font-bold leading-[1.08] tracking-tight text-[#10234b]
  text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl
`.trim();

export const pageHeroDescClass = `
  mt-4 max-w-lg font-inter text-sm leading-relaxed text-slate-700 sm:text-base
`.trim();
