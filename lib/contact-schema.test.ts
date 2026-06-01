import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse({
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "08123456789",
      message: "Saya tertarik dengan layanan pengelolaan aset.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts payload without optional phone", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = contactSchema.safeParse({
      name: "B",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "not-an-email",
      message: "Pesan yang cukup panjang untuk lolos.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({
      name: "Budi",
      email: "budi@example.com",
      message: "pendek",
    });
    expect(result.success).toBe(false);
  });
});
