import { Award, Globe2, Layers3 } from "lucide-react";
import CountryBadge from "./CountryLabel";
import FloatingInfoCard from "./InfoCard";
import { floatingCards, mapCountries } from "../data/hero.data";

const cardIcons = {
  award: Award,
  layers: Layers3,
  globe: Globe2,
} as const;

const locationPins = [
  { x: 155, y: 140 },
  { x: 183, y: 104 },
  { x: 337, y: 126 },
  { x: 370, y: 145 },
  { x: 400, y: 230 },
  { x: 420, y: 335 },
];

export default function WorldMapIllustration() {
  return (
    <div className="world-map-illustration" aria-label="Global service coverage">
      <div className="world-map-glow" aria-hidden="true" />

      <svg
        viewBox="0 0 600 520"
        className="world-map-svg"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-map-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#93C5FD" />
          </pattern>
          <radialGradient id="hero-map-glow">
            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        <ellipse cx="320" cy="245" rx="260" ry="220" fill="url(#hero-map-glow)" />

        <g fill="#BFDBFE" opacity="0.72">
          <path d="M75 105 L104 70 146 54 177 65 202 90 190 115 164 124 155 150 133 163 119 190 95 180 85 152 65 137Z" />
          <path d="M161 194 L193 205 210 241 198 280 184 312 170 353 150 333 148 297 135 264 141 230Z" />
          <path d="M244 100 L269 81 296 91 313 112 302 134 277 143 265 130Z" />
          <path d="M283 148 L320 143 349 164 357 195 341 226 331 269 308 299 286 277 276 244 263 212 265 179Z" />
          <path d="M310 105 L340 80 383 64 430 75 468 96 505 110 520 135 499 151 463 145 442 166 413 159 395 177 370 161 349 143 328 139Z" />
          <path d="M386 178 L423 173 455 191 474 218 455 241 431 251 415 284 394 271 386 239 368 214Z" />
          <path d="M454 296 L484 282 514 294 527 317 512 343 481 348 459 330Z" />
          <path d="M495 369 L514 359 535 370 538 387 520 399 500 389Z" />
        </g>

        <g fill="url(#hero-map-dots)" opacity="0.82">
          <path d="M75 105 L104 70 146 54 177 65 202 90 190 115 164 124 155 150 133 163 119 190 95 180 85 152 65 137Z" />
          <path d="M161 194 L193 205 210 241 198 280 184 312 170 353 150 333 148 297 135 264 141 230Z" />
          <path d="M244 100 L269 81 296 91 313 112 302 134 277 143 265 130Z" />
          <path d="M283 148 L320 143 349 164 357 195 341 226 331 269 308 299 286 277 276 244 263 212 265 179Z" />
          <path d="M310 105 L340 80 383 64 430 75 468 96 505 110 520 135 499 151 463 145 442 166 413 159 395 177 370 161 349 143 328 139Z" />
          <path d="M386 178 L423 173 455 191 474 218 455 241 431 251 415 284 394 271 386 239 368 214Z" />
        </g>

        <g className="hero-route" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" opacity="0.8">
          <path d="M155 140 Q245 38 337 126" />
          <path d="M155 140 Q285 185 370 145" />
          <path d="M155 140 Q300 255 420 335" />
          <path d="M337 126 Q360 180 400 230" />
          <path d="M370 145 Q410 240 420 335" />
        </g>

        {locationPins.map(({ x, y }) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <circle r="10" fill="#2563EB" fillOpacity="0.12" />
            <circle r="5.5" fill="white" stroke="#2563EB" strokeWidth="2" />
            <circle r="2" fill="#2563EB" />
          </g>
        ))}

        <g transform="translate(500 63) rotate(-28)" fill="#334155">
          <path d="M-20 0 L-4 -3 L8 -18 L13 -18 L9 -2 L24 2 L24 6 L8 5 L1 15 L-4 15 L-1 4 L-20 4Z" />
        </g>
      </svg>

      {mapCountries.map((country) => (
        <CountryBadge key={country.name} {...country} />
      ))}

      <div className="hero-workspace-frame">
        <img
          src="/images/hero-workspace.webp"
          alt="Developer working at a computer"
          className="hero-workspace-image"
          width={700}
          height={500}
          loading="eager"
        />
        <div className="hero-workspace-caption">
          <p className="text-[10px] font-semibold text-white sm:text-xs">Digital innovation</p>
          <p className="mt-0.5 text-[9px] text-white/80 sm:text-[10px]">Built for businesses worldwide</p>
        </div>
      </div>

      {floatingCards.map((card) => {
        const Icon = cardIcons[card.icon];
        return (
          <FloatingInfoCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            Icon={Icon}
            className={card.className}
          />
        );
      })}

      <p className="world-map-handwriting" aria-hidden="true">
        Delivering Digital<br />Success Worldwide
      </p>
    </div>
  );
}
