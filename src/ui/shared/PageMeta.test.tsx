import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLayout } from "./AppLayout.tsx";
import { IntlProvider } from "@/ui/i18n";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

function renderAt(pathname: string) {
  return render(
    <IntlProvider>
      <MemoryRouter initialEntries={[pathname]}>
        <AppLayout>
          <p>contenuto</p>
        </AppLayout>
      </MemoryRouter>
    </IntlProvider>,
  );
}

function metaContent(attribute: "name" | "property", key: string): string | null {
  return (
    document.head.querySelector(`meta[${attribute}="${key}"]`)?.getAttribute("content") ?? null
  );
}

describe("PageMeta", () => {
  // jsdom reports navigator.language as en-US; the stored preference pins the catalog.
  beforeEach(() => {
    localStorage.setItem("qg.locale", "it");
  });

  it("titles the home page with the site name first", () => {
    renderAt("/");
    expect(document.title).toBe("Quanto Guadagno · Calcolo stipendio netto");
    expect(metaContent("name", "description")).toBe(itMessages["meta.home.description"]);
    expect(metaContent("property", "og:title")).toBe(document.title);
    expect(metaContent("property", "og:description")).toBe(itMessages["meta.home.description"]);
    expect(metaContent("property", "og:type")).toBe("website");
    expect(metaContent("property", "og:locale")).toBe("it_IT");
  });

  it("titles an inner page with the page name first", () => {
    renderAt("/calcolo-naspi");
    expect(document.title).toBe("Calcolo NASpI · Quanto Guadagno");
    expect(metaContent("name", "description")).toBe(itMessages["meta.naspi.description"]);
  });

  it("falls back to the not-found copy on an unmapped path", () => {
    renderAt("/questa-pagina-non-esiste");
    expect(document.title).toBe("Pagina non trovata · Quanto Guadagno");
    expect(metaContent("name", "description")).toBe(itMessages["meta.notFound.description"]);
  });
});
