import { useEffect } from "react";
import { defaultImage, siteName, siteUrl } from "../data/seo.data";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "profile";
  robots?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    "meta[" + attr + "=\"" + key + "\"]",
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    "link[rel=\"" + rel + "\"]",
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function usePageSeo(seo: PageSeo | null) {
  useEffect(() => {
    if (!seo) return;

    const canonical = siteUrl + seo.path;
    const image = siteUrl + (seo.image ?? defaultImage);

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.robots ?? "index, follow");
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
  }, [seo]);
}
