export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: Date;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
};

export type WhyUsItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: { value: number; suffix?: string; label: string };
};

export type CompanyInfo = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  kemenkumhamNo: string;
  npwp: string;
  foundedYear: number;
};
