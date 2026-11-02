type SocialIconProps = {
  id: string;
  className?: string;
};

export default function SocialIcon({ id, className = "h-4 w-4" }: SocialIconProps) {
  switch (id) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.5 9.5V17M6.5 7.2v.1M10.5 17v-4.2c0-1.5.8-2.3 2-2.3s2 .9 2 2.3V17M14.5 10.5V17"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3.5"
            y="3.5"
            width="17"
            height="17"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M7 7l10 10M17 7 7 17"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.44.08.6-.19.6-.42v-1.5c-2.45.53-2.97-1.18-2.97-1.18-.4-1-.98-1.27-.98-1.27-.8-.55.06-.54.06-.54.89.06 1.36.92 1.36.92.79 1.35 2.08.96 2.58.73.08-.57.31-.96.56-1.18-1.96-.22-4.02-.98-4.02-4.36 0-.96.34-1.75.9-2.37-.09-.22-.39-1.12.09-2.33 0 0 .74-.24 2.43.9a8.3 8.3 0 0 1 4.42 0c1.69-1.14 2.43-.9 2.43-.9.48 1.21.18 2.11.09 2.33.56.62.9 1.41.9 2.37 0 3.39-2.07 4.14-4.04 4.36.32.28.6.82.6 1.66v2.46c0 .23.16.5.61.42A8.8 8.8 0 0 0 12 3.2Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M24 12.1C24 5.4 18.4 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.2 10.1 24v-8.3H7.2v-3.4h2.9V9.4c0-2.9 1.7-4.5 4.3-4.5 1.2 0 2.4.2 2.4.2v2.9h-1.5c-1.5 0-2 0.9-2 1.8v2.1h3.3l-.5 3.4h-2.8V24C19.6 23.2 24 18.1 24 12.1Z" />
        </svg>
      );
    default:
      return null;
  }
}
