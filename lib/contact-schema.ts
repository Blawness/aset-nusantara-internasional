import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.email("Format email tidak valid"),
  phone: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactInput = z.infer<typeof contactSchema>;
