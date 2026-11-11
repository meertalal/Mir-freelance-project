import { useEffect, useSyncExternalStore } from "react";
import {
  defaultImage,
  organization,
  routeSeo,
  siteName,
  siteUrl,
  websiteSchema,
} from "../../data/seo.data";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const subscribeToRoute = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};

const getPathname = () => window.location.pathname.replace(/\/+$/, "") || "/";

export default function Seo() {
  const pathname = useSyncExternalStore(
    subscribeToRoute,
    getPathname,
    () => "/",
  );
  const seo = routeSeo[pathname] ?? routeSeo["/"];
  const isKnown = pathname in routeSeo;
  const canonical = `${siteUrl}${seo.path === "/" ? "/" : seo.path}`;
  const image = `${siteUrl}${seo.image ?? defaultImage}`;
  const robots = isKnown ? (seo.robots ?? "index, follow") : "noindex, follow";

  useEffect(() => {
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", robots);
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", seo.type ?? "website");
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);
  }, [seo, canonical, image, robots]);

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      websiteSchema,
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
