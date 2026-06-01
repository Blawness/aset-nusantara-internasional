import { ImageResponse } from "next/og";

export const alt = "PT Aset Nusantara Internasional — Pemulihan & Pemanfaatan Aset Bangsa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#0A1628",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,162,75,0.18), transparent 70%)",
          color: "#F5F1E8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C9A24B",
          }}
        >
          Terdaftar Resmi Kemenkumham RI
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          PT Aset Nusantara Internasional
        </div>

        <div style={{ display: "flex", width: 220, height: 6, marginTop: 40, backgroundColor: "#C9A24B" }} />

        <div style={{ display: "flex", marginTop: 36, fontSize: 36, color: "#BDB8AC", maxWidth: 900 }}>
          Pemulihan & Pemanfaatan Aset Bangsa dengan Integritas
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 60,
            right: 90,
            fontSize: 26,
            color: "#C9A24B",
          }}
        >
          asetnusantarainternasional.com
        </div>
      </div>
    ),
    { ...size }
  );
}
