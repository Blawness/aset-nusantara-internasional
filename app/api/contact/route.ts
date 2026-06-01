import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { getResend } from "@/lib/resend";
import { COMPANY_INFO } from "@/lib/constants";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Body tidak valid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = parsed.data;

  const phoneDisplay = phone?.trim() ? phone : "-";

  try {
    const { error } = await getResend().emails.send({
      from: "Website ANI <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO ?? COMPANY_INFO.email,
      replyTo: email,
      subject: `Inquiry baru dari ${name}`,
      text: [
        `Nama   : ${name}`,
        `Email  : ${email}`,
        `Telepon: ${phoneDisplay}`,
        "",
        "Pesan:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ success: false, error: "Gagal mengirim pesan" }, { status: 500 });
    }
  } catch {
    // Missing/invalid API key or network failure — fail gracefully.
    return NextResponse.json({ success: false, error: "Gagal mengirim pesan" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
