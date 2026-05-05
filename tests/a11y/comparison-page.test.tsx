import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "@/ui/i18n";
import { ComparisonPage } from "@/ui/features/comparison";

expect.extend(toHaveNoViolations);

describe("ComparisonPage accessibility", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("has no axe violations on initial render", async () => {
    const { container } = render(
      <IntlProvider>
        <MemoryRouter>
          <ComparisonPage />
        </MemoryRouter>
      </IntlProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
