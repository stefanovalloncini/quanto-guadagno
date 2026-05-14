import type { ShareLinkPort } from "@/ports/ShareLinkPort";

export interface Container {
  readonly shareLink: ShareLinkPort | null;
}

let cached: Container | null = null;

export const createContainer = (): Container => {
  if (cached) return cached;
  cached = {
    shareLink: null,
  };
  return cached;
};
