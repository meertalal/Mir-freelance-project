export type SocialIconId =
  | "linkedin"
  | "x"
  | "github"
  | "instagram";

export interface FooterSocialLink {
  id: SocialIconId;
  label: string;
  href: string;
}

export interface FooterQuickLink {
  label: string;
  href: string;
}

export interface FooterCountry {
  id: string;
  name: string;
  image: string;
}

export interface CountryMapBadgeProps {
  name: string;
  image: string;
}

export interface SocialIconProps {
  id: SocialIconId;
  className?: string;
}
