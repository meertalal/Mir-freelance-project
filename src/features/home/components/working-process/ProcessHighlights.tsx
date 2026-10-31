import { workingProcessHighlights } from "../../data/working-process.data";

export default function ProcessHighlights() {
  return (
    <ul
      className="
        mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#D6E4F7]
        bg-white sm:grid-cols-2 lg:grid-cols-4
      "
    >
      {workingProcessHighlights.map(({ id, title, Icon }, index) => (
        <li
          key={id}
          className={[
            "flex items-center gap-3 px-5 py-4",
            index !== workingProcessHighlights.length - 1
              ? "border-b border-[#D6E4F7] lg:border-b-0 lg:border-r"
              : "",
            index % 2 === 0 ? "sm:border-r sm:border-[#D6E4F7] lg:border-r" : "",
            index < 2 ? "sm:border-b sm:border-[#D6E4F7] lg:border-b-0" : "",
          ].join(" ")}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1670F5]">
            <Icon size={18} aria-hidden="true" />
          </span>
          <span className="font-montserrat text-sm font-bold text-[#10234B]">
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
}
