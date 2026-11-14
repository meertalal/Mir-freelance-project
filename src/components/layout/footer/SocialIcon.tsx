import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

type SocialIconProps = {
  id: string;
  className?: string;
};

const socialIcons: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

export default function SocialIcon({ id, className = "h-4 w-4" }: SocialIconProps) {
  const Icon = socialIcons[id];
  if (!Icon) return null;

  return <Icon className={className} aria-hidden="true" />;
}
