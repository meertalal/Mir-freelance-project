import { useEffect, useState, type RefObject } from "react";

const revealBaseClass =
  "transition-[opacity,transform] duration-700 ease-out will-change-transform motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  delay = 0,
) {
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return {
    style: { transitionDelay: `${delay}ms` },
    className: `${revealBaseClass} ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
  };
}
