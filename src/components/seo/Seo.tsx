import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../features/admin/api/client";
import { useSiteSettings } from "../../features/site-settings/useSiteSettings";
import {
  breadcrumbSchema,
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

export default function Seo() {
  const pathname = useLocation().pathname.replace(/\/+$/, "") || "/";
  const settings = useSiteSettings();
  const route = routeSeo[pathname] ?? routeSeo["/"];
  const seo = useMemo(
    () => pathname === "/" ? {
      ...route,
      title: settings.seo.title || route.title,
      description: settings.seo.description || route.description,
      image: settings.seo.ogImage || route.image,
    } : route,
    [pathname, route, settings.seo.title, settings.seo.description, settings.seo.ogImage],
  );
  const isKnown = pathname in routeSeo;
  const canonical = `${siteUrl}${seo.path === "/" ? "/" : seo.path}`;
  const imagePath = seo.image ?? defaultImage;
  const image = /^https?:\/\//i.test(imagePath)
    ? imagePath
    : `${siteUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
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
    upsertMeta("property", "og:image:alt", seo.title);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", seo.title);

    let cancelled = false;
    const query = new URLSearchParams({ path: pathname });
    void fetch(apiUrl(`/api/seo/page?${query}`), { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: { title?: string; description?: string; og_title?: string; og_description?: string; og_image?: string } | null } | null) => {
        if (cancelled || !payload?.data) return;
        const row = payload.data;
        if (row.title) { document.title = row.title; upsertMeta("property", "og:title", row.title); upsertMeta("name", "twitter:title", row.title); }
        if (row.description) { upsertMeta("name", "description", row.description); upsertMeta("property", "og:description", row.description); upsertMeta("name", "twitter:description", row.description); }
        if (row.og_title) { upsertMeta("property", "og:title", row.og_title); upsertMeta("name", "twitter:title", row.og_title); }
        if (row.og_description) { upsertMeta("property", "og:description", row.og_description); upsertMeta("name", "twitter:description", row.og_description); }
        if (row.og_image) { const imageUrl = /^https?:\/\//i.test(row.og_image) ? row.og_image : `${siteUrl}${row.og_image.startsWith("/") ? "" : "/"}${row.og_image}`; upsertMeta("property", "og:image", imageUrl); upsertMeta("name", "twitter:image", imageUrl); }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [seo, canonical, image, robots, pathname]);

  const breadcrumbs =
    isKnown && seo.breadcrumbs?.length
      ? breadcrumbSchema(seo.breadcrumbs, `${canonical}#breadcrumb`)
      : null;

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      websiteSchema,
      ...(isKnown
        ? [
            {
              "@type": "WebPage",
              "@id": `${canonical}#webpage`,
              url: canonical,
              name: seo.title,
              description: seo.description,
              isPartOf: { "@id": `${siteUrl}/#website` },
              inLanguage: "en",
              ...(breadcrumbs
                ? { breadcrumb: { "@id": `${canonical}#breadcrumb` } }
                : {}),
            },
          ]
        : []),
      ...(breadcrumbs ? [breadcrumbs] : []),
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
