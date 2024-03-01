export type PostType = {
  id: string,
  summary: string,
  text: string,
  type: string,
  time: string,
  isFavorite: boolean,
  page?: string
}

type PostResponse = {
  isFavorite: boolean;
  summary: string;
  text: string;
  time: string;
  type: string;
}

export type PostsData = {
  [key: string]: PostResponse;
}