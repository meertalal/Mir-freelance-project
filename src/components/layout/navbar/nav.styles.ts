export const navCtaClassName = [
  "group inline-flex min-h-11 items-center justify-center gap-2",
  "rounded-lg bg-[#5882E8] px-4",
  "font-playfair text-xs font-semibold text-black",
  "shadow-sm transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:bg-[#7296f0] hover:shadow-md",
  "active:translate-y-0",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
  "2xl:min-h-12 2xl:gap-3 2xl:px-5 2xl:text-sm",
  "min-[1920px]:min-h-14 min-[1920px]:gap-3 min-[1920px]:rounded-xl min-[1920px]:px-7 min-[1920px]:text-base",
  "min-[2560px]:min-h-16 min-[2560px]:px-9 min-[2560px]:text-lg",
].join(" ");

export function navLinkClassName(isActive: boolean, mobile = false) {
  return [
    "whitespace-nowrap font-roboto-condensed font-semibold tracking-wide",
    "transition-colors duration-300 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    mobile
      ? [
          "flex min-h-11 w-full items-center rounded-lg px-4 text-sm",
          "transition-[background-color,color,transform] duration-300 ease-out",
          "hover:translate-x-1 hover:bg-white/10 hover:text-white",
          isActive ? "bg-white/10 text-white" : "text-white/85",
        ].join(" ")
      : [
          "relative flex min-h-10 items-center justify-center px-2 2xl:px-3",
          "2xl:text-base min-[1920px]:min-h-12 min-[1920px]:px-4 min-[1920px]:text-lg",
          "min-[2560px]:px-5 min-[2560px]:text-xl",
          "after:absolute after:bottom-1 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-white",
          "after:origin-center after:transition-transform after:duration-300 after:ease-out",
          "hover:text-white",
          isActive
            ? "text-white after:scale-x-100"
            : "text-white/85 after:scale-x-0 hover:after:scale-x-100",
        ].join(" "),
  ].join(" ");
}

export function navbarShellClassName(isScrolled: boolean) {
  return [
    "sticky top-0 z-[1000] w-full",
    "transition-[padding] duration-500 ease-in-out",
    isScrolled
      ? "px-2 pt-2 sm:px-4 lg:px-6 2xl:px-8 min-[1920px]:px-12 min-[2560px]:px-16"
      : "px-0 pt-0",
  ].join(" ");
}

export function navbarBarClassName(isScrolled: boolean) {
  return [
    "relative mx-auto flex w-full items-center justify-between",
    "gap-2 sm:gap-3 xl:gap-4 2xl:gap-6 min-[1920px]:gap-10 min-[2560px]:gap-14",
    "border border-white/10 bg-[#092f58] backdrop-blur-xl",
    "transition-[max-width,min-height,border-radius,box-shadow,padding] duration-500 ease-in-out",
    isScrolled
      ? [
          "min-h-14 max-w-[1600px] rounded-full px-3 shadow-[0_8px_30px_rgba(15,23,42,0.25)]",
          "sm:px-5 lg:px-6 2xl:px-8",
          "min-[1920px]:min-h-16 min-[1920px]:max-w-[1900px] min-[1920px]:px-10",
          "min-[2560px]:min-h-[76px] min-[2560px]:max-w-[2200px] min-[2560px]:px-14",
        ].join(" ")
      : [
          "min-h-16 max-w-none rounded-none px-3",
          "sm:min-h-[72px] sm:px-5 lg:px-6 xl:min-h-[76px] xl:px-8",
          "2xl:min-h-20 2xl:px-12",
          "min-[1920px]:min-h-[92px] min-[1920px]:px-16",
          "min-[2560px]:min-h-[104px] min-[2560px]:px-20",
        ].join(" "),
  ].join(" ");
}
