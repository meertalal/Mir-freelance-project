type CountryMapBadgeProps = {
  name: string;
  flag: string;
  path: string;
};

export default function CountryMapBadge({ name, flag, path }: CountryMapBadgeProps) {
  const patternId = `flag-pattern-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="group flex flex-col items-center gap-1.5 text-center transition duration-300 hover:-translate-y-1">
      <svg
        viewBox="0 0 54 38"
        className="h-9 w-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)] sm:h-10 sm:w-14 lg:h-11 lg:w-16"
        role="img"
        aria-label={`${name} map`}
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="54"
            height="38"
          >
            <image href={flag} width="54" height="38" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <path
          d={path}
          fill={`url(#${patternId})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.8"
          className="transition-[filter] duration-300 group-hover:brightness-110"
        />
      </svg>
      <span className="max-w-[4.5rem] font-inter text-[9px] leading-tight text-white/85 sm:max-w-[5.2rem] sm:text-[10px] lg:text-[11px]">
        {name}
      </span>
    </div>
  );
}
