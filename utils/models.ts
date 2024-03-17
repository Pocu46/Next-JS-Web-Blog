export type PostsType = {
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

export type PostType = "Note" | "News";

export type SendPostProps = {
  summary: string;
  text: string;
  type: string | PostType
}