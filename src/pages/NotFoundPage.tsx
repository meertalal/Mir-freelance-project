import { Link } from "react-router-dom";
import { pageHeroTitleClass } from "../components/shared/section.styles";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
        404
      </p>
      <h1 className={`mt-3 ${pageHeroTitleClass}`}>Page Not Found</h1>
      <p className="mt-4 max-w-md font-inter text-sm leading-relaxed text-slate-700">
        The page you are looking for does not exist or has been moved. Explore
        the available pages below.
      </p>
      <nav aria-label="Site" className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-[#092f58] px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-[#10234b]"
        >
          Back to Home
        </Link>
        <Link
          to="/services"
          className="rounded-full border border-[#092f58]/20 px-5 py-2.5 font-inter text-sm font-semibold text-[#092f58] transition hover:bg-[#092f58]/5"
        >
          View Services
        </Link>
        <Link
          to="/contact"
          className="rounded-full border border-[#092f58]/20 px-5 py-2.5 font-inter text-sm font-semibold text-[#092f58] transition hover:bg-[#092f58]/5"
        >
          Contact
        </Link>
      </nav>
    </section>
  );
}
