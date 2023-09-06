import { useState } from "react";
import { CommentsContext } from "../contexts/comments";
import { commentsData } from "../datas/comments";
import { IComment } from "../interfaces/Comment";

function CommentsProvider({ children }: { children: any }) {
  const [comments, setComments] = useState<IComment[]>([commentsData[0]]);
  return (
    <CommentsContext.Provider
      value={{
        comments: comments,
        setComments: setComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
