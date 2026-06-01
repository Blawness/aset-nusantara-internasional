export type Article = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  body: string[]; // paragraphs
};

export const ARTICLES: Article[] = [
  {
    slug: "memahami-pemulihan-aset-negara",
    title: "Memahami Proses Pemulihan Aset Negara",
    date: "2026-05-20",
    excerpt:
      "Pemulihan aset negara adalah proses hukum dan administratif yang menjaga nilai kekayaan bangsa. Berikut tahapannya secara ringkas.",
    body: [
      "Pemulihan aset negara merupakan rangkaian proses untuk mengidentifikasi, mengamankan, dan mengembalikan nilai aset yang menjadi hak negara. Proses ini menuntut ketelitian hukum dan administrasi yang tinggi.",
      "Tahap awal dimulai dari verifikasi legalitas dan dokumentasi kepemilikan, dilanjutkan dengan pengamanan fisik maupun yuridis atas aset tersebut.",
      "PT Aset Nusantara Internasional hadir untuk mendampingi setiap tahap dengan pendekatan profesional, transparan, dan sesuai ketentuan hukum yang berlaku.",
    ],
  },
  {
    slug: "peran-aset-collateral-bagi-bangsa",
    title: "Peran Aset Collateral bagi Ketahanan Bangsa",
    date: "2026-05-12",
    excerpt:
      "Aset collateral bernilai strategis bagi negara. Pengelolaannya yang akuntabel menjaga kepercayaan dan stabilitas.",
    body: [
      "Aset collateral merupakan jaminan bernilai strategis yang berperan penting dalam menjaga stabilitas dan kepercayaan ekonomi nasional.",
      "Pengelolaan yang akuntabel memastikan setiap aset terdokumentasi dengan baik dan terlindungi dari penyalahgunaan.",
      "Melalui tata kelola yang menjunjung integritas, nilai aset dapat dimanfaatkan secara optimal demi kepentingan bangsa.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
