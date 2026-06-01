import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn();
vi.mock("@/lib/resend", () => ({
  resend: { emails: { send: (...args: unknown[]) => sendMock(...args) } },
}));

import { POST } from "@/app/api/contact/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
  });

  it("returns 200 and sends email for valid payload", async () => {
    const res = await POST(
      makeRequest({
        name: "Budi Santoso",
        email: "budi@example.com",
        message: "Saya tertarik dengan layanan Anda sekalian.",
      })
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("returns 400 for invalid payload and does not send", async () => {
    const res = await POST(makeRequest({ name: "B", email: "bad", message: "x" }));
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 500 when Resend errors", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "fail" } });
    const res = await POST(
      makeRequest({
        name: "Budi Santoso",
        email: "budi@example.com",
        message: "Pesan yang cukup panjang untuk lolos validasi.",
      })
    );
    const json = await res.json();
    expect(res.status).toBe(500);
    expect(json.success).toBe(false);
  });
});
