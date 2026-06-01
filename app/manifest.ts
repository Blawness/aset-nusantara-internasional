import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_INFO.name,
    short_name: "ANI",
    description:
      "Pemulihan dan pemanfaatan aset bangsa dengan integritas dan legalitas resmi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1628",
    theme_color: "#0A1628",
    lang: "id",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
