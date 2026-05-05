export interface HistoryEntry<T = unknown> {
  readonly id: string;
  readonly createdAt: string;
  readonly label: string;
  readonly payload: T;
}

export interface NewHistoryEntry<T = unknown> {
  readonly label: string;
  readonly payload: T;
}

export interface HistoryPort<T = unknown> {
  list(): Promise<ReadonlyArray<HistoryEntry<T>>>;
  add(entry: NewHistoryEntry<T>): Promise<HistoryEntry<T>>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}
