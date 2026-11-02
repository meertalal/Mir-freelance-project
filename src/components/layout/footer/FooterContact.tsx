
import { footerCountries } from "../../../data/footer.data";
import CountryMapBadge from "./CountryMapBadge";
import FooterHeading from "./FooterHeading";

export default function FooterCountries() {
  return (
    <div className="flex flex-col items-center text-center lg:border-l lg:border-white/15 lg:pl-10">
      <FooterHeading className="text-center">
        Countries We Serve
      </FooterHeading>

      <div
        className="
          mx-auto grid w-full max-w-[22rem]
          grid-cols-5 justify-items-center
          gap-x-2 gap-y-3
          sm:max-w-[26rem] sm:gap-x-3 sm:gap-y-4
          lg:max-w-full
        "
      >
        {footerCountries.map((country) => (
          <CountryMapBadge
            key={country.id}
            name={country.name}
            image={country.image}
          />
        ))}
      </div>
    </div>
  );
}
