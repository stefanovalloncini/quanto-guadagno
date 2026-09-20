import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ledger, LedgerRow, LedgerGroup, LedgerTotal } from "./Ledger.tsx";

describe("Ledger", () => {
  it("renders a table with a row header and a right-hand amount", () => {
    render(
      <Ledger>
        <LedgerRow label="Retribuzione lorda" amount={30000} />
      </Ledger>,
    );
    const row = screen.getByRole("rowheader", { name: /Retribuzione lorda/ });
    expect(row).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/30\.000/)).toHaveClass("qg-num");
  });

  it("sets a negative amount with a real minus sign when subtract is passed", () => {
    render(
      <Ledger>
        <LedgerRow label="Contributi INPS" amount={2757} subtract />
      </Ledger>,
    );
    expect(screen.getByText(/2\.757/).textContent).toMatch(/^−/);
  });

  it("appends the rate as a suffix in the label cell", () => {
    render(
      <Ledger>
        <LedgerRow label="Contributi INPS" amount={2757} rate={0.0919} subtract />
      </Ledger>,
    );
    expect(screen.getByRole("rowheader")).toHaveTextContent(/9,19/);
  });

  it("stripes every other ordinary row and leaves groups and totals alone", () => {
    const { container } = render(
      <Ledger>
        <LedgerGroup label="Trattenute" />
        <LedgerRow label="Uno" amount={1} />
        <LedgerRow label="Due" amount={2} />
        <LedgerRow label="Tre" amount={3} />
        <LedgerTotal label="Totale" amount={6} />
      </Ledger>,
    );
    const zebra = container.querySelectorAll(".qg-ledger__row--zebra");
    expect(zebra).toHaveLength(1);
    expect(zebra[0]).toHaveTextContent("Due");
    expect(container.querySelector(".qg-ledger__group")).toHaveTextContent("Trattenute");
    expect(container.querySelector(".qg-ledger__total")).toHaveTextContent("Totale");
  });

  it("renders a caption when one is given", () => {
    render(
      <Ledger caption="Dettaglio del calcolo">
        <LedgerRow label="Uno" amount={1} />
      </Ledger>,
    );
    expect(screen.getByText("Dettaglio del calcolo")).toBeInTheDocument();
  });
});
