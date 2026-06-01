import type { CompanyInfo, ServiceItem, WhyUsItem } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "PT Aset Nusantara Internasional",
  tagline: "Pemulihan dan Pemanfaatan Aset Bangsa dengan Integritas",
  address:
    "Kompleks Perkantoran Bank Indonesia, RT. 001 / RW. 002, Gambir, Jakarta Pusat 10110",
  phone: "021-3928018",
  email: "asetnusantara247@gmail.com",
  kemenkumhamNo: "AHU-A085911.AH.01.30.Tahun 2026",
  npwp: "1000 0000 0947 7237",
  foundedYear: 2026,
};

export const SERVICES: ServiceItem[] = [
  {
    id: "aset-bergerak",
    title: "Aset Bergerak",
    description:
      "Pengelolaan, pemulihan, dan optimalisasi aset bergerak seperti kendaraan, alat berat, dan inventaris bernilai, sesuai prosedur hukum dan administratif yang berlaku.",
    icon: "Truck",
  },
  {
    id: "aset-tidak-bergerak",
    title: "Aset Tidak Bergerak (Tanah & Bangunan)",
    description:
      "Penanganan tanah, bangunan, dan properti strategis — dari verifikasi legalitas, pemulihan kepemilikan, hingga pemanfaatan nilai aset secara optimal.",
    icon: "Building2",
  },
  {
    id: "aset-warisan",
    title: "Aset Peninggalan Warisan / Negara-Daerah",
    description:
      "Identifikasi, pengamanan, dan pemanfaatan aset peninggalan warisan serta aset negara dan daerah, menjunjung nilai sejarah dan kepentingan bangsa.",
    icon: "Landmark",
  },
  {
    id: "aset-sitaan",
    title: "Aset Sitaan Negara / Bank Likuidasi",
    description:
      "Pengelolaan aset hasil sitaan negara maupun aset bank dalam likuidasi secara akuntabel, transparan, dan sesuai ketentuan hukum yang berlaku.",
    icon: "Gavel",
  },
  {
    id: "aset-collateral",
    title: "Aset Collateral Bangsa",
    description:
      "Penanganan aset collateral bernilai strategis bagi negara dengan pendekatan profesional, menjaga keamanan dan integritas setiap proses.",
    icon: "ShieldCheck",
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    id: "legalitas",
    title: "Legalitas Resmi",
    description:
      "Terdaftar resmi di Kemenkumham RI dan beroperasi penuh sesuai kerangka hukum yang berlaku.",
    icon: "BadgeCheck",
    stat: { value: 2026, label: "Tahun Berdiri" },
  },
  {
    id: "nasional",
    title: "Jangkauan Nasional",
    description:
      "Menangani aset di seluruh wilayah Indonesia dengan jaringan yang luas dan terkoordinasi.",
    icon: "Globe",
    stat: { value: 5, suffix: "+", label: "Kategori Aset" },
  },
  {
    id: "akuntabel",
    title: "Profesional & Akuntabel",
    description:
      "Setiap proses dijalankan transparan dengan standar administrasi dan dokumentasi yang ketat.",
    icon: "ClipboardCheck",
    stat: { value: 100, suffix: "%", label: "Transparan" },
  },
  {
    id: "kebangsaan",
    title: "Fokus Kepentingan Bangsa",
    description:
      "Mengutamakan pemulihan dan pemanfaatan aset demi nilai kebangsaan, bukan sekadar komersial.",
    icon: "Flag",
  },
];

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Kontak", href: "#kontak" },
];
