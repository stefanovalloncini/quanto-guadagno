import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { metaForPath } from "@/app/pageMeta.ts";

const SITE_NAME = "Quanto Guadagno";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function PageMeta() {
  const intl = useIntl();
  const { pathname } = useLocation();

  useEffect(() => {
    const { titleId, descriptionId } = metaForPath(pathname);
    const name = intl.formatMessage({ id: titleId });
    const description = intl.formatMessage({ id: descriptionId });
    const title = pathname === "/" ? `${SITE_NAME} · ${name}` : `${name} · ${SITE_NAME}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", intl.locale === "en" ? "en_GB" : "it_IT");
  }, [intl, pathname]);

  return null;
}
