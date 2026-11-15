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
        group relative flex h-full flex-col items-center
        rounded-2xl border border-[#E6EEF9] bg-white
        px-5 py-6 text-center
        shadow-[0_10px_28px_rgba(15,48,91,0.05)]
        transition duration-300
        hover:-translate-y-1 hover:border-[#C9DEFF]
        hover:shadow-[0_18px_40px_rgba(15,48,91,0.10)]
        motion-reduce:transition-none
        sm:px-6 sm:py-7
        2xl:px-7 2xl:py-8
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-x-8 top-0 h-0.5 rounded-full
          bg-gradient-to-r from-transparent via-[#1670F5]/70 to-transparent
          opacity-0 transition-opacity duration-300 group-hover:opacity-100
        "
      />

      <div
        className="
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-2xl bg-gradient-to-br from-[#EAF2FF] to-[#DCE9FF]
          text-[#1670F5] ring-1 ring-[#D6E4F7]
          transition duration-300
          group-hover:from-[#092f58] group-hover:to-[#0f3d6e] group-hover:text-white
          2xl:h-14 2xl:w-14
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 2xl:h-7 2xl:w-7"
          aria-hidden="true"
        >
          <path d={iconPaths[feature.icon]} />
        </svg>
      </div>

      <h3
        className="
          mt-4 font-montserrat text-sm font-bold leading-snug text-[#10234B]
          2xl:mt-5 2xl:text-base
        "
      >
        {feature.title}
      </h3>

      <p
        className="
          mt-2 font-inter text-xs leading-relaxed text-[#5B7291]
          sm:text-[13px]
          2xl:text-sm
        "
      >
        {feature.description}
      </p>
    </article>
  );
}
