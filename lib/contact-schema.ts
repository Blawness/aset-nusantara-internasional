import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .email("Format email tidak valid")
    .max(200, "Email maksimal 200 karakter"),
  phone: z.string().max(30, "Nomor telepon maksimal 30 karakter").optional(),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(5000, "Pesan maksimal 5000 karakter"),
});

export type ContactInput = z.infer<typeof contactSchema>;
