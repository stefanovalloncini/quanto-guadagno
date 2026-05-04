export interface HistoryEntry {
  readonly id: string;
  readonly createdAt: string;
  readonly label: string;
  readonly payload: unknown;
}

export interface HistoryPort {
  list(): Promise<ReadonlyArray<HistoryEntry>>;
  add(entry: Omit<HistoryEntry, "id" | "createdAt">): Promise<HistoryEntry>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}
