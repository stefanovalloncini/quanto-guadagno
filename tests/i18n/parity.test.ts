import { describe, it, expect } from "vitest";
import { it as itMessages } from "@/ui/i18n/messages/it.ts";
import { en as enMessages } from "@/ui/i18n/messages/en.ts";

type Key = keyof typeof itMessages;

const keys = Object.keys(itMessages) as Key[];

// ICU argument names. Formatted arguments ({x, number}, {x, plural}, …) are
// always caught by the comma. Simple {x} arguments are caught too, except
// inside plural/select messages where {…} also wraps sub-message text — there
// only the formatted form is reliable, and both locales share the structure.
function placeholderNames(message: string): string[] {
  const names = new Set<string>();
  for (const m of message.matchAll(/\{\s*(\w+)\s*,/g)) if (m[1]) names.add(m[1]);
  if (!/\b(plural|select|selectordinal)\b/.test(message)) {
    for (const m of message.matchAll(/\{\s*(\w+)\s*\}/g)) if (m[1]) names.add(m[1]);
  }
  return [...names].sort();
}

function richTextTags(message: string): string[] {
  return (message.match(/<\/?[a-zA-Z][\w-]*>/g) ?? []).sort();
}

describe("i18n catalog parity (IT ↔ EN)", () => {
  it("exposes the same keys in both locales", () => {
    expect(Object.keys(enMessages).sort()).toEqual([...keys].sort());
  });

  it("has no empty or whitespace-only values", () => {
    const empty = keys.filter((k) => !itMessages[k].trim() || !enMessages[k].trim());
    expect(empty).toEqual([]);
  });

  it("uses the same ICU arguments per key", () => {
    const mismatched = keys.filter(
      (k) =>
        placeholderNames(itMessages[k]).join(",") !== placeholderNames(enMessages[k]).join(","),
    );
    expect(mismatched).toEqual([]);
  });

  it("uses the same rich-text tags per key", () => {
    const mismatched = keys.filter(
      (k) => richTextTags(itMessages[k]).join(",") !== richTextTags(enMessages[k]).join(","),
    );
    expect(mismatched).toEqual([]);
  });
});
