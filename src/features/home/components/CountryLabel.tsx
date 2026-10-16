import type { Country } from "../data/hero.data";

type CountryBadgeProps = Country & {
  className: string;
};

export default function CountryBadge({
  name,
  flag,
  className,
}: CountryBadgeProps) {
  return (
    <div className={`map-country ${className}`}>
      <span aria-hidden="true">{flag}</span>
      <span>{name}</span>
    </div>
  );
}