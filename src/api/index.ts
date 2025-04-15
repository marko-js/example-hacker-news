export type StoryType = keyof typeof StoryType;
const StoryType = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
} as const;

export interface PartialStory {
  id: number;
  comments_count: number;
  domain?: string;
  points?: number;
  time_ago: string;
  time: number;
  title: string;
  type: string;
  url: string;
  user?: string;
}
export interface Story {
  id: number;
  comments_count: number;
  comments: Comment[];
  domain: string;
  points: number;
  time_ago: string;
  time: number;
  title: string;
  type: string;
  url: string;
  user: string;
}

export interface Comment {
  id: number;
  comments: Comment[];
  content: string;
  level: number;
  time_ago: string;
  time: number;
  user: string;
}

export interface User {
  id: string;
  about?: string;
  created: number;
  karma: number;
  submitted: number[];
}

export function getUser(id: string) {
  return get<User>(`https://hacker-news.firebaseio.com/v0/user/${id}.json`);
}

export function getStory(id: number) {
  return get<Story>(`https://node-hnapi.herokuapp.com/item/${id}`);
}

export function getStories(type: StoryType, page: number) {
  return get<PartialStory[]>(
    `https://node-hnapi.herokuapp.com/${StoryType[type]}?page=${page}`,
  );
}

async function get<T>(href: string | URL | Request) {
  const res = await fetch(href, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json() as T;
}
