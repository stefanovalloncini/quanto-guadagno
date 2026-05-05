import type { HistoryEntry, HistoryPort, NewHistoryEntry } from "@/ports/HistoryPort";

interface PersistedShape<T> {
  readonly version: 1;
  readonly entries: ReadonlyArray<HistoryEntry<T>>;
}

const isPersistedShape = (value: unknown): value is PersistedShape<unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return v.version === 1 && Array.isArray(v.entries);
};

const generateId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

export function createLocalHistoryAdapter<T>(storageKey: string): HistoryPort<T> {
  const read = (): ReadonlyArray<HistoryEntry<T>> => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!isPersistedShape(parsed)) return [];
      return parsed.entries as ReadonlyArray<HistoryEntry<T>>;
    } catch {
      return [];
    }
  };

  const write = (entries: ReadonlyArray<HistoryEntry<T>>) => {
    try {
      const payload: PersistedShape<T> = { version: 1, entries };
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {
      // ignore quota or privacy mode
    }
  };

  return {
    list: () => Promise.resolve(read()),
    add: (entry: NewHistoryEntry<T>) => {
      const created: HistoryEntry<T> = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        label: entry.label,
        payload: entry.payload,
      };
      write([...read(), created]);
      return Promise.resolve(created);
    },
    remove: (id: string) => {
      write(read().filter((e) => e.id !== id));
      return Promise.resolve();
    },
    clear: () => {
      write([]);
      return Promise.resolve();
    },
  };
}
