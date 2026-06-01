import { Resend } from "resend";

let client: Resend | null = null;

// Lazily instantiate the Resend client so the API key is only required at
// request time — not when the route module is imported during `next build`
// (page-data collection). Constructing at module top-level would throw
// "Missing API key" on any build/host without RESEND_API_KEY set.
export function getResend(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}
