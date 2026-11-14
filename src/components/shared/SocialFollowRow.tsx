import SocialIcon from "../layout/footer/SocialIcon";
import { footerSocialLinks } from "../../data/footer.data";

type SocialFollowRowProps = {
  className?: string;
};

export default function SocialFollowRow({ className = "mt-7" }: SocialFollowRowProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <p className="font-playfair text-[11px] font-semibold uppercase tracking-[0.14em] text-[#092F58]">
        Follow Me On
      </p>
      <div className="flex items-center gap-2">
        {footerSocialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#D6E4F7] bg-white text-[#092F58] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#092F58] hover:bg-[#092f58] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5882E8]"
          >
            <SocialIcon id={social.id} className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
