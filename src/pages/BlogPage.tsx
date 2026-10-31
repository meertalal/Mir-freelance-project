import LinkButton from "../components/ui/LinkButton";
import CtaBanner from "../components/shared/CtaBanner";
import PageEyebrow from "../components/shared/PageEyebrow";
import {
  innerContainerClass,
  innerSectionClass,
  pageHeroDescClass,
  pageHeroTitleClass,
} from "../components/shared/section.styles";

export default function BlogPage() {
  return (
    <>
      <section className={`${innerSectionClass} bg-[#F7FAFF] text-center`}>
        <div className={`${innerContainerClass} flex flex-col items-center`}>
          <PageEyebrow>Blog</PageEyebrow>
          <h1 className={`${pageHeroTitleClass} max-w-3xl text-center`}>
            Insights Coming Soon
          </h1>
          <p className={`${pageHeroDescClass} mx-auto max-w-xl text-center`}>
            Articles on web development, AI automation, SaaS, and product delivery are on the way.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton to="/contact" showArrow>
              Get a Free Quote
            </LinkButton>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
