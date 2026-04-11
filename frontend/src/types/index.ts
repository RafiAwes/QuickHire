export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  level: string;
  salary?: string;
  postedAt: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  userName: string;
  userEmail: string;
  resumeUrl: string;
  coverNote: string;
  appliedAt: string;
}

export interface TaxonomyItem {
  id: number;
  name: string;
}

export interface TaxonomyResponse {
  categories: Category[];
  jobTypes: TaxonomyItem[];
  experienceLevels: TaxonomyItem[];
}
