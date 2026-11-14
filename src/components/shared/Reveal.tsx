import { useRef, type ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref, delay);

  return (
    <div ref={ref} style={reveal.style} className={`${reveal.className} ${className}`}>
      {children}
    </div>
  );
}
