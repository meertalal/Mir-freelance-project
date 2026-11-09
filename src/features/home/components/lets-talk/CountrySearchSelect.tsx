import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { CountryOption } from "../../data/lets-talk.data";

type CountrySearchSelectProps = {
  id?: string;
  value: string;
  onChange: (countryName: string) => void;
  countries: CountryOption[];
  placeholder?: string;
};

export default function CountrySearchSelect({
  id,
  value,
  onChange,
  countries,
  placeholder = "Select a country",
}: CountrySearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find((country) => country.name === value);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    searchInputRef.current?.focus();

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 320 && rect.top > spaceBelow);
    }
  }, [open]);

  const openList = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setQuery("");
    setOpen(true);
  };

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return countries;
    }

    return countries.filter((country) =>
      country.name.toLowerCase().includes(normalizedQuery),
    );
  }, [countries, query]);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={openList}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-[#F7FAFF] px-3.5 py-3 text-left text-base text-slate-800 outline-none transition focus:border-[#1670F5] focus:bg-white focus:ring-2 focus:ring-[#1670F5]/20 focus:shadow-[0_0_0_1px_#1670F5] sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="shrink-0 text-base">
            {selectedCountry?.flag}
          </span>
          <span className="truncate">
            {selectedCountry?.name ?? placeholder}
          </span>
        </span>
        <ChevronDown size={16} aria-hidden="true" className="shrink-0 text-slate-500" />
      </button>

      {open ? (
        <div
          className={`absolute z-20 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,48,91,0.08)] ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="border-b border-slate-200 p-2">
            <div className="relative">
              <Search
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search country..."
                aria-label="Search country"
                className="w-full min-h-11 rounded-lg border border-slate-200 bg-[#F7FAFF] py-2 pl-9 pr-3 text-base text-slate-800 outline-none transition focus:border-[#1670F5] focus:bg-white focus:ring-2 focus:ring-[#1670F5]/20 focus:shadow-[0_0_0_1px_#1670F5] sm:text-sm"
              />
            </div>
          </div>
          <ul className="max-h-[min(18rem,45vh)] overflow-y-auto overscroll-contain p-2" role="listbox">
            {filteredCountries.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-500">No countries found.</li>
            ) : (
              filteredCountries.map((country) => (
                <li key={country.code} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={country.name === value}
                    onClick={() => handleSelect(country.name)}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1670F5] ${
                      country.name === value
                        ? "bg-[#EAF2FF] text-[#092f58]"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span aria-hidden="true" className="shrink-0 text-base">
                      {country.flag}
                    </span>
                    <span className="truncate">{country.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
