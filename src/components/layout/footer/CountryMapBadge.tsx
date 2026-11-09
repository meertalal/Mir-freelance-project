type CountryMapBadgeProps = {
  name: string;
  image: string;
};

export default function CountryMapBadge({ name, image }: CountryMapBadgeProps) {
  return (
    <div className="group flex flex-col items-center gap-1 text-center transition duration-300 hover:-translate-y-1">
      <img
        src={image}
        alt={`${name} map`}
        loading="lazy"
        decoding="async"
        width={44}
        height={32}
        className="h-8 w-11 object-contain"
      />
      <span className="max-w-[5.5rem] font-inter text-[11px] leading-tight text-white/85">
        {name}
      </span>
    </div>
  );
}
