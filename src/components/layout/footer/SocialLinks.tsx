
import { footerSocialLinks } from "../../../data/footer.data";
import SocialIcon from "./SocialIcon";

export default function SocialLinks() {
  return (
    <div className="mt-4 flex items-center justify-center gap-2.5 sm:mt-5 lg:justify-start">
      {footerSocialLinks.map((social) => (
        <a
          key={social.id}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="
            inline-flex h-8 w-8 items-center justify-center
            rounded-full border border-white/20
            bg-white/5 text-white/90
            transition duration-300
            hover:-translate-y-0.5 hover:border-white
            hover:bg-white/10 hover:text-white
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
          "
        >
          <SocialIcon id={social.id} className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
