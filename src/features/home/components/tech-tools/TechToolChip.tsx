import type { TechTool } from "../../data/tech-tools.data";

type TechToolChipProps = {
  tool: TechTool;
};

// Heights account for internal padding so every logo renders at a matching optical size.
const logoHeights: Record<string, number> = {
  "react.webp": 22,
  "nextjs.webp": 21.5,
  "vue.webp": 20,
  "tailwindcss.webp": 24,
  "laravel.webp": 18.5,
  "nodejs.webp": 19,
  "php.webp": 25,
  "django.webp": 37.5,
  "flutter.webp": 20,
  "reactnative.webp": 20,
  "android.webp": 20,
  "ios.webp": 19,
  "mysql.svg": 24,
  "postgresql.webp": 19.5,
  "mongodb.webp": 18,
  "redis.webp": 18.5,
  "aws.webp": 18.5,
  "docker.webp": 19,
  "github.webp": 18.5,
  "cicd.webp": 19.5,
  "figma.svg": 18,
  "git.svg": 18,
  "jira.svg": 18,
  "slack.svg": 18,
};

const lightLogos = new Set(["next", "django"]);
const brightLogos = new Set(["laravel", "php", "redis"]);

function logoFilter(id: string) {
  if (lightLogos.has(id)) return "brightness-0 invert";
  if (id === "ios") return "invert grayscale";
  
  if (brightLogos.has(id)) return "brightness-125";
  return "";
}

export default function TechToolChip({ tool }: TechToolChipProps) {
  const file = tool.image?.split("/").pop() ?? "";

  return (
    <span className="flex w-full min-w-0 items-center gap-2.5 px-1.5 xl:gap-3 xl:px-2">
      <span className="flex w-14 shrink-0 items-center justify-center xl:w-16">
        {tool.image ? (
          <img
            src={tool.image}
            alt=""
            decoding="async"
            loading="lazy"
            style={{ height: `${logoHeights[file] ?? 18}px` }}
            className={`w-auto max-w-full object-contain ${logoFilter(tool.id)}`}
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-inter text-[13px] font-bold uppercase leading-none text-[#9DC4EE]"
          >
            {tool.name.slice(0, 1)}
          </span>
        )}
      </span>
      <span className="min-w-0 truncate font-inter text-[10.5px] font-semibold leading-tight text-[#D7E5F7] xl:text-xs">
        {tool.name}
      </span>
    </span>
  );
}
