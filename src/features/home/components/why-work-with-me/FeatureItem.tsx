import type {
  FeatureItemProps,
  FeatureIcon,
} from "../../types/why-work.types";

const iconPaths: Record<FeatureIcon, string> = {
  communication:
    "M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  delivery:
    "M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m12.72 0-1.42-1.42M7.06 7.06 5.64 5.64M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  technology:
    "M9 3H5a2 2 0 0 0-2 2v4h6V3Zm10 0h-4v6h6V5a2 2 0 0 0-2-2ZM3 15v4a2 2 0 0 0 2 2h4v-6H3Zm12 0v6h4a2 2 0 0 0 2-2v-4h-6Z",
  support:
    "M4 13v-2a8 8 0 0 1 16 0v2m-16-1H3v5h4v-5H4Zm16 0h1v5h-4v-5h3Zm-4 7a4 4 0 0 1-4 2h-1",
};

export default function FeatureItem({
  feature,
}: FeatureItemProps) {
  return (
    <article
      className="
        flex min-w-0 items-start gap-2.5
        sm:gap-3
        lg:gap-3.5
        2xl:gap-4
      "
    >
      <div
        className="
          flex h-8 w-8 shrink-0 items-center justify-center
          rounded-lg bg-blue-50 text-blue-600
          sm:h-9 sm:w-9
          lg:h-10 lg:w-10
          2xl:h-12 2xl:w-12
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            h-4 w-4
            sm:h-[18px] sm:w-[18px]
            lg:h-5 lg:w-5
            2xl:h-6 2xl:w-6
          "
          aria-hidden="true"
        >
          <path d={iconPaths[feature.icon]} />
        </svg>
      </div>

      <div className="min-w-0">
        <h3
          className="
            text-[11px] font-bold leading-4 text-slate-800
            sm:text-xs
            lg:text-sm
            2xl:text-base
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-0.5 text-[10px] leading-[1.5] text-slate-500
            sm:text-[11px]
            lg:text-xs
            2xl:text-sm 2xl:leading-relaxed
          "
        >
          {feature.description}
        </p>
      </div>
    </article>
  );
}