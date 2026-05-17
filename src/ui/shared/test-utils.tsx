import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";

export function renderWithIntl(node: ReactNode) {
  return render(
    <IntlProvider locale="it-IT" messages={itMessages}>
      <MemoryRouter>{node}</MemoryRouter>
    </IntlProvider>,
  );
}
