type CountryMapBadgeProps = {
  name: string;
  image: string;
};

export default function CountryMapBadge({ name, image }: CountryMapBadgeProps) {
  return (
    <div className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        width={24}
        height={18}
        className="h-[18px] w-6 object-contain"
      />
      <span className="font-inter text-[11px] font-medium leading-none sm:text-xs">
        {name}
      </span>
    </div>
  );
}
