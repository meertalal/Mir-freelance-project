type CountryMapBadgeProps = {
  name: string;
  image: string;
};

export default function CountryMapBadge({ name, image }: CountryMapBadgeProps) {
  return (
    <div className="group flex flex-col items-center gap-1.5 text-center transition duration-300 hover:-translate-y-1">
      <div className="overflow-hidden rounded-xl border border-white/20 bg-white/10 p-1 shadow-[0_10px_22px_rgba(9,47,88,0.15)] backdrop-blur-sm">
        <img
          src={image}
          alt={`${name} map`}
          className="h-8 w-11 object-contain sm:h-9 sm:w-12 lg:h-10 lg:w-14"
        />
      </div>
      <span className="max-w-[4.5rem] font-inter text-[8px] leading-tight text-white/85 sm:max-w-[5.2rem] sm:text-[9px] lg:text-[10px]">
        {name}
      </span>
    </div>
  );
}
