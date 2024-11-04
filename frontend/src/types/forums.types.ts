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
  banner: string | null;
  banner_height: number;
  basis: string;
  total_topics: number;
  total_messages: number;
  show_last_message: boolean;
  show_last_topic: boolean;
}

export interface Section {
  id: number;
  name: string;
  description: string;
  slug: string;
  path: string;
  topics: SectionTopic[] | [];
  topics_pages: number;
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
  messages: TopicMessage[] | [];
  messages_pages: number;
  created_at: string;
  updated_at: string;
}

export interface TopicMessage {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}
