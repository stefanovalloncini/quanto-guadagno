import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormattedMessage } from "react-intl";
import { IntlProvider } from "./IntlProvider.tsx";
import { useLocale } from "./locale.ts";

function Probe() {
  const { locale, toggle } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <p>
        <FormattedMessage id="nav.sources" />
      </p>
      <button onClick={toggle}>switch</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <IntlProvider>
      <Probe />
    </IntlProvider>,
  );
}

describe("IntlProvider", () => {
  // jsdom reports navigator.language as en-US, so the stored preference is
  // what keeps these runs deterministic.
  beforeEach(() => {
    localStorage.setItem("qg.locale", "it");
  });

  it("starts in Italian", () => {
    renderProvider();
    expect(screen.getByTestId("locale")).toHaveTextContent("it");
    expect(screen.getByText("Fonti")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("it");
  });

  it("renders English once the catalog has loaded", async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByText("switch"));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");

    expect(await screen.findByText("Sources")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("qg.locale")).toBe("en");
  });

  it("goes back to Italian", async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByText("switch"));
    expect(await screen.findByText("Sources")).toBeInTheDocument();

    await user.click(screen.getByText("switch"));
    expect(screen.getByText("Fonti")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("it");
  });
});
