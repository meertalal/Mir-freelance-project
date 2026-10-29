import LinkButton from "../ui/LinkButton";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export default function CtaBanner({
  title = "Let's Build Something Amazing Together",
  description = "From idea to global success — websites, apps, AI and automation built for real business impact.",
}: CtaBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-[#F5F9FF] to-[#DCEBFF] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(22,112,245,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(9,47,88,0.12), transparent 35%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1670F5] sm:text-xs">
          From Idea to Global Success
        </p>
        <h2 className="max-w-3xl font-georgia text-3xl font-bold tracking-tight text-[#10234B] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl font-inter text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton to="/contact" showArrow>
            Get a Free Quote
          </LinkButton>
          <LinkButton to="/contact" variant="secondary">
            Schedule a Call
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
