import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme, type Theme } from "./useTheme.ts";

function Probe() {
  const { theme, setTheme, cycle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("dark" as Theme)}>set-dark</button>
      <button onClick={() => setTheme("system" as Theme)}>set-system</button>
      <button onClick={cycle}>cycle</button>
    </div>
  );
}

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("starts in 'system' when nothing is stored", () => {
    render(<Probe />);
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });

  it("starts in the stored value when localStorage has it", () => {
    localStorage.setItem("qg.theme", "dark");
    render(<Probe />);
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("setTheme('dark') writes localStorage and sets data-theme=dark", async () => {
    const user = userEvent.setup();
    render(<Probe />);
    await user.click(screen.getByText("set-dark"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("qg.theme")).toBe("dark");
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("setTheme('system') clears localStorage and applies system preference", async () => {
    localStorage.setItem("qg.theme", "dark");
    const user = userEvent.setup();
    render(<Probe />);
    await user.click(screen.getByText("set-system"));
    expect(localStorage.getItem("qg.theme")).toBe(null);
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
    // data-theme should be either "light" or "dark" depending on jsdom's matchMedia
    const attr = document.documentElement.getAttribute("data-theme");
    expect(attr === "light" || attr === "dark").toBe(true);
  });

  it("cycle moves light → dark → system → light", async () => {
    localStorage.setItem("qg.theme", "light");
    const user = userEvent.setup();
    render(<Probe />);
    expect(screen.getByTestId("theme")).toHaveTextContent("light");

    await user.click(screen.getByText("cycle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem("qg.theme")).toBe("dark");

    await user.click(screen.getByText("cycle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
    expect(localStorage.getItem("qg.theme")).toBe(null);

    await user.click(screen.getByText("cycle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(localStorage.getItem("qg.theme")).toBe("light");
  });
});
