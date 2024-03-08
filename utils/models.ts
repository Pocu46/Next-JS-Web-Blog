export type PostType = {
  id: string,
  summary: string,
  text: string,
  type: string,
  time: string,
  isFavorite: boolean,
  page?: string
}

export type PostResponse = {
  isFavorite: boolean;
  summary: string;
  text: string;
  time: string;
  type: string;
}

type Id = {
  id: string
}

export type PostsData = {
  [id: string]: PostResponse;
}