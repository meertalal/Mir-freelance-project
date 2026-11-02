
type FooterHeadingProps = {
  children: string;
  className?: string;
};

export default function FooterHeading({
  children,
  className = "",
}: FooterHeadingProps) {
  return (
    <h3
      className={`
        mb-4 font-playfair text-[13px] font-semibold
        uppercase tracking-[0.14em] text-white
        sm:mb-5 sm:text-sm
        ${className}
      `}
    >
      {children}
    </h3>
  );
}
