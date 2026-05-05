import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createLocalHistoryAdapter } from "@/adapters/storage-local/createLocalHistoryAdapter.ts";

interface TestPayload {
  readonly amount: number;
}

describe("createLocalHistoryAdapter", () => {
  const KEY = "qg.test.history";

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("starts empty", async () => {
    const port = createLocalHistoryAdapter<TestPayload>(KEY);
    expect(await port.list()).toEqual([]);
  });

  it("adds entries with id and createdAt", async () => {
    const port = createLocalHistoryAdapter<TestPayload>(KEY);
    const entry = await port.add({ label: "first", payload: { amount: 100 } });
    expect(entry.id).toBeTruthy();
    expect(entry.createdAt).toMatch(/\d{4}-\d{2}-\d{2}T/);
    expect(entry.payload.amount).toBe(100);
  });

  it("persists across instances", async () => {
    const a = createLocalHistoryAdapter<TestPayload>(KEY);
    await a.add({ label: "x", payload: { amount: 1 } });
    const b = createLocalHistoryAdapter<TestPayload>(KEY);
    const list = await b.list();
    expect(list).toHaveLength(1);
    expect(list[0]?.label).toBe("x");
  });

  it("removes a single entry", async () => {
    const port = createLocalHistoryAdapter<TestPayload>(KEY);
    const a = await port.add({ label: "a", payload: { amount: 1 } });
    await port.add({ label: "b", payload: { amount: 2 } });
    await port.remove(a.id);
    const list = await port.list();
    expect(list).toHaveLength(1);
    expect(list[0]?.label).toBe("b");
  });

  it("clear empties everything", async () => {
    const port = createLocalHistoryAdapter<TestPayload>(KEY);
    await port.add({ label: "x", payload: { amount: 1 } });
    await port.clear();
    expect(await port.list()).toEqual([]);
  });

  it("ignores corrupted storage and returns empty", async () => {
    window.localStorage.setItem(KEY, "{not-valid-json");
    const port = createLocalHistoryAdapter<TestPayload>(KEY);
    expect(await port.list()).toEqual([]);
  });
});
