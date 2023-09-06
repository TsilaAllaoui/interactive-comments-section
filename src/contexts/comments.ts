import { createContext } from "react";
import { IComment } from "../interfaces/Comment";
export interface CommentType {
  comments: IComment[];
  setComments: (c: IComment[]) => void;
}

export const CommentsContext = createContext<CommentType>({
  comments: [],
  setComments: (_c: IComment[]) => {},
});
