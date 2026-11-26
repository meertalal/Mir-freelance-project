import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

export default function RouteErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("Route rendering failed:", error);
    }
  }, [error]);

  return (
    <main
      role="alert"
      className="flex min-h-screen items-center justify-center bg-[#F7FAFF] px-4 py-16"
    >
      <section className="w-full max-w-lg rounded-3xl border border-[#E1EAF6] bg-white p-7 text-center shadow-[0_20px_60px_rgba(15,48,91,0.08)] sm:p-10">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <TriangleAlert size={25} aria-hidden="true" />
        </span>
        <p className="mt-5 font-playfair text-xs font-bold uppercase tracking-[0.16em] text-[#5882E8]">
          Page error
        </p>
        <h1 className="mt-2 font-montserrat text-2xl font-bold text-[#10234B] sm:text-3xl">
          We couldn&apos;t load this page
        </h1>
        <p className="mx-auto mt-3 max-w-sm font-inter text-sm leading-6 text-[#526987]">
          Something went wrong. You can try again or return to the homepage.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#092f58] px-5 font-inter text-sm font-semibold text-white transition hover:bg-[#10234b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#092f58]/20 px-5 font-inter text-sm font-semibold text-[#092f58] transition hover:bg-[#092f58]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
