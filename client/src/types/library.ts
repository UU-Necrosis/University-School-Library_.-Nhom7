export interface PatronInfo {
  name: string;
  code: string;
  role: string;
  department: string;
  ssoConnected: boolean;
  activeLoans: number;
  maxLoans: number;
}

export type SearchScope = "all" | "books" | "journals" | "theses" | "databases";

export interface BookItem {
  id: string;
  title: string;
  author: string;
  year: number;
  type: "Sách in" | "Open Access" | "Luận án Tiến sĩ" | "Tạp chí Scopus";
  identifier: string; // DDC, DOI, or ISBN
  status: "available" | "open_access" | "print_digital" | "borrowed_out";
  statusText: string;
  department: string;
  coverImage: string;
}

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  detail: string;
  detailStatus: string;
  detailStatusColor: string;
  actionText: string;
}

export interface DatabaseBadgeItem {
  id: string;
  name: string;
  provider: string;
  badgeType: string;
  url: string;
}

export interface EventItem {
  id: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  spotsLeft: string;
  actionText: string;
}
