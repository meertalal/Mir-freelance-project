export const navCtaClassName = [
  "group inline-flex min-h-10 items-center justify-center gap-2",
  "rounded-full bg-white px-4 text-[#0c2c54]",
  "font-inter text-[11px] font-bold uppercase tracking-[0.1em]",
  "shadow-[0_10px_24px_rgba(2,14,30,0.25)]",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:bg-[#EAF2FF] hover:shadow-[0_14px_30px_rgba(2,14,30,0.3)]",
  "active:translate-y-0",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  "2xl:min-h-11 2xl:gap-2.5 2xl:px-5 2xl:text-xs",
  "min-[1920px]:min-h-12 min-[1920px]:px-6 min-[1920px]:text-[13px]",
  "min-[2560px]:min-h-14 min-[2560px]:px-8 min-[2560px]:text-sm",
].join(" ");

export function navLinkClassName(isActive: boolean, mobile = false) {
  return [
    "font-inter font-medium tracking-[0.01em]",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD]",
    mobile
      ? [
          "flex min-h-11 w-full items-center rounded-xl px-4 text-sm",
          "hover:bg-white/5 hover:text-white",
          isActive
            ? "bg-white/10 text-white ring-1 ring-inset ring-white/10"
            : "text-white/75",
        ].join(" ")
      : [
          "relative flex min-h-9 shrink-0 items-center justify-center rounded-full px-2.5",
          "text-[13.5px] 2xl:px-3 2xl:text-[14.5px]",
          "min-[1920px]:min-h-10 min-[1920px]:px-4 min-[1920px]:text-[15px]",
          "min-[2560px]:px-5 min-[2560px]:text-base",
          isActive
            ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            : "text-white/70 hover:bg-white/5 hover:text-white",
        ].join(" "),
  ].join(" ");
}

export function navbarShellClassName() {
  return [
    "sticky top-0 z-[1000] w-full",
    "h-[72px] sm:h-[82px] 2xl:h-[92px] min-[1920px]:h-[100px] min-[2560px]:h-[108px]",
    "px-3 pt-3 sm:px-4 lg:px-6 xl:px-8 2xl:pt-4 min-[1920px]:px-12 min-[2560px]:px-16",
  ].join(" ");
}

export function navbarBarClassName(isScrolled: boolean) {
  return [
    "relative mx-auto flex h-[60px] w-full max-w-[1480px] items-center justify-between",
    "gap-2 border border-white/10 px-3 backdrop-blur-xl",
    "transition-[border-radius,box-shadow,background-color] duration-500 ease-in-out",
    "before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px",
    "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    "sm:h-[70px] sm:gap-3 sm:px-5 2xl:h-[76px] 2xl:px-8",
    "min-[1600px]:max-w-[1560px] min-[1920px]:h-[84px] min-[1920px]:max-w-[1720px] min-[1920px]:px-10",
    "min-[2560px]:h-[92px] min-[2560px]:max-w-[1960px] min-[2560px]:px-14",
    isScrolled
      ? "rounded-full bg-[#082a4e]/95 shadow-[0_14px_38px_rgba(2,16,34,0.4)]"
      : "rounded-2xl bg-[#092f58] shadow-[0_18px_48px_rgba(3,18,38,0.24)]",
  ].join(" ");
}
