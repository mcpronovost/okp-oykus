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
  last_topic: CategorySectionTopic | null;
  last_message: CategorySectionMessage | null;
}

export interface CategorySectionTopic {
  id: number;
  name: string;
  slug: string;
  path: string;
  created_at: string;
}

export interface CategorySectionMessage {
  id: number;
  path: string;
  character: CategorySectionMessageCharacter | null;
  created_at: string;
}

export interface CategorySectionMessageCharacter {
  id: number;
  name: string;
  abbr: string;
  slug: string;
  avatar: string | null;
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
  character: SectionTopicCharacter | null;
  last_message: SectionTopicMessage | null;
  total_messages: number;
  created_at: string;
  updated_at: string;
}

export interface SectionTopicMessage {
  id: number;
  character: SectionTopicCharacter | null;
  created_at: string;
  updated_at: string;
}

export interface SectionTopicCharacter {
  id: number;
  name: string;
  abbr: string;
  slug: string;
  avatar: string | null;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  path: string;
  messages: TopicMessage[] | [];
  total_pages: number;
  created_at: string;
  updated_at: string;
}

export interface TopicMessage {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}
