import LinkButton from "../components/ui/LinkButton";
import CtaBanner from "../components/shared/CtaBanner";

export default function BlogPage() {
  return (
    <>
      <section className="px-4 py-20 text-center sm:px-6 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1670F5]">
          Blog
        </p>
        <h1 className="mt-3 font-georgia text-4xl font-bold text-[#10234B] sm:text-5xl">
          Insights Coming Soon
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-inter text-sm text-slate-600 sm:text-base">
          Articles on web development, AI automation, SaaS, and product delivery are on the way.
        </p>
        <div className="mt-8 flex justify-center">
          <LinkButton to="/contact" showArrow>
            Get a Free Quote
          </LinkButton>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
