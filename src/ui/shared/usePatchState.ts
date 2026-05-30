import { useCallback, useState } from "react";

export type PatchState<T> = readonly [state: T, patch: (patch: Partial<T>) => void];

export function usePatchState<T extends object>(initial: T | (() => T)): PatchState<T> {
  const [state, setState] = useState<T>(initial);

  const patch = useCallback((next: Partial<T>) => {
    setState((current) => ({ ...current, ...next }));
  }, []);

  return [state, patch];
}
