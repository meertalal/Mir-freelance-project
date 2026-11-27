import { useEffect } from "react";
import { defaultImage, siteName, siteUrl } from "../data/seo.data";
import { apiUrl } from "../features/admin/api/client";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
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
    const apply = (entry: PageSeo) => {
      const canonical = siteUrl + entry.path;
      const imagePath = entry.image ?? defaultImage;
      const image = /^https?:\/\//i.test(imagePath)
        ? imagePath
        : new URL(imagePath, siteUrl).toString();
      document.title = entry.title;
      upsertMeta("name", "description", entry.description);
      upsertMeta("name", "robots", entry.robots ?? "index, follow");
      upsertLink("canonical", canonical);
      upsertMeta("property", "og:type", entry.type ?? "website");
      upsertMeta("property", "og:site_name", siteName);
      upsertMeta("property", "og:title", entry.title);
      upsertMeta("property", "og:description", entry.description);
      upsertMeta("property", "og:url", canonical);
      upsertMeta("property", "og:image", image);
      const imageAlt = entry.imageAlt ?? entry.title;
      upsertMeta("property", "og:image:alt", imageAlt);
      upsertMeta("property", "og:image:width", "1200");
      upsertMeta("property", "og:image:height", "630");
      upsertMeta("property", "og:locale", "en_US");
      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:title", entry.title);
      upsertMeta("name", "twitter:description", entry.description);
      upsertMeta("name", "twitter:image", image);
      upsertMeta("name", "twitter:image:alt", imageAlt);
    };
    apply(seo);
    let cancelled = false;
    const query = new URLSearchParams({ path: seo.path });
    void fetch(apiUrl(`/api/seo/page?${query}`), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: { title?: string; description?: string; og_title?: string; og_description?: string; og_image?: string } | null } | null) => {
        if (cancelled || !payload?.data) return;
        const remote = payload.data;
        apply({ ...seo, title: remote.title || seo.title, description: remote.description || seo.description, image: remote.og_image || seo.image, imageAlt: remote.og_title || seo.imageAlt });
        if (remote.og_title) upsertMeta("property", "og:title", remote.og_title);
        if (remote.og_description) {
          upsertMeta("property", "og:description", remote.og_description);
          upsertMeta("name", "twitter:description", remote.og_description);
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [seo]);
}
