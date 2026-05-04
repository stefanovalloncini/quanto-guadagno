export interface ShareLinkPort {
  encode(payload: unknown): Promise<string>;
  decode(token: string): Promise<unknown>;
}
