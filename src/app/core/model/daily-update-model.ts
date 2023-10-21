export interface Post {
    id: string;
    title: string;
    link: string;
    authors: string[];
    published_at: string;
    summary: string;
    n_threads: number;
    dev_name: string;
    contributors: string[];
    file_path: string;
  }
  
export interface DailyUpdateData {
    header_summary: string;
    recent_posts: Post[];
    active_posts: Post[];
}

export interface Topic {
  id: string;
  title: string;
  updated: string;
  authorName: string
  entries: TopicEntry[]
}

export interface TopicEntry {
  id: string;
  link: string;
  published: string;
  summary: string;
  title: string;
  updated: string;
};