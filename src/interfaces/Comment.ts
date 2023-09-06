export interface IUser {
  username: string;
  image: string;
}

export interface IComment {
  id: number;
  content: string;
  score: number;
  createdAt: string;
  user: IUser;
  replies?: IComment[];
}
