export interface Category {
  id: number;
  name: string;
  slug: string;
  path: string;
  description: string | null;
  sections: CategorySection[] | [];
}

export interface CategorySection {
  id: number;
  name: string;
  slug: string;
  path: string;
  total_topics: number;
  total_messages: number;
}

export interface Section {
  id: number;
  name: string;
  description: string;
  slug: string;
  path: string;
  topics: SectionTopic[] | [];
  total_topics: number;
  total_messages: number;
}

export interface SectionTopic {
  id: number;
  name: string;
  slug: string;
  path: string;
  last_message: SectionTopicMessage | null;
  total_messages: number;
  created_at: string;
  updated_at: string;
}

export interface SectionTopicMessage {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  path: string;
  created_at: string;
  updated_at: string;
}
