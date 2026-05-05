import { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Stack } from "@/ui/design-system";
import { SOURCE_DOCS, type SourceDoc } from "./sources.ts";

export function DataSourcesPage() {
  const [activeSlug, setActiveSlug] = useState<string>(() => SOURCE_DOCS[0]?.slug ?? "");
  const active: SourceDoc = useMemo(
    () => SOURCE_DOCS.find((d) => d.slug === activeSlug) ?? (SOURCE_DOCS[0] as SourceDoc),
    [activeSlug],
  );

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="sources.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="sources.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="sources.page.subtitle" />
          </p>
        </header>

        <div className="qg-sources-layout">
          <nav aria-label="data sources" className="qg-sources-nav">
            <ul>
              {SOURCE_DOCS.map((doc) => (
                <li key={doc.slug}>
                  <button
                    type="button"
                    className={
                      doc.slug === active.slug
                        ? "qg-sources-nav__item qg-sources-nav__item--active"
                        : "qg-sources-nav__item"
                    }
                    onClick={() => setActiveSlug(doc.slug)}
                  >
                    <FormattedMessage id={doc.titleId} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="qg-sources-doc">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{active.content}</ReactMarkdown>
          </article>
        </div>
      </Stack>
    </main>
  );
}
