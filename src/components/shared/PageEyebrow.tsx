type PageEyebrowProps = {
  children: string;
  className?: string;
};

export default function PageEyebrow({ children, className = "" }: PageEyebrowProps) {
  return (
    <div className="mb-4 flex w-full max-w-max items-center gap-3 sm:mb-5">
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#092f58] sm:w-12" />
      <p
        className={`font-playfair text-[11px] font-semibold uppercase tracking-[0.12em] text-[#092f58] sm:text-xs ${className}`}
      >
        {children}
      </p>
      <span
        aria-hidden="true"
        className="h-px min-w-3 flex-1 bg-[#092f58] sm:min-w-8"
      />
    </div>
  );
}
