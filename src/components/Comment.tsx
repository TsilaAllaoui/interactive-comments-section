import { useContext, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { UserContext } from "../contexts/user";
import { IComment } from "../interfaces/Comment";
import "../styles/Comment.scss";
import Form from "./Form";

function Comment({ comment }: { comment: IComment }) {
  const userName = useContext(UserContext).username;
  const [isAdding, setIsAdding] = useState(false);

  const handleReply = (_e: React.MouseEvent<HTMLDivElement>) => {
    setIsAdding(!isAdding);
  };

  return (
    <div className="comment-container">
      <div className="comment">
        <div id="reactions">
          <BiPlus id="plus" />
          <p>{comment.score}</p>
          <BiMinus id="minus" />
        </div>
        <div id="main">
          <div id="infos">
            <div id="user">
              <img src={comment.user.image} alt={comment.user.image} />
              <p>{comment.user.username}</p>
              <p>{comment.createdAt}</p>
            </div>
            <div id="actions">
              {comment.user.username == userName ? (
                <>
                  <div id="delete">
                    <MdDelete />
                    <p>Delete</p>
                  </div>
                  <div id="edit">
                    <MdEdit />
                    <p>Edit</p>
                  </div>
                </>
              ) : (
                <div id="reply" onClick={handleReply}>
                  <BsReplyFill />
                  <p>Reply</p>
                </div>
              )}
            </div>
          </div>
          <div id="content">
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
      {isAdding ? (
        <Form type="REPLY" replyTo={comment.id} setIsAdding={setIsAdding} />
      ) : null}
      {comment.replies && comment.replies.length > 0 ? (
        <div id="replies-container">
          <div className="line"></div>
          <div id="replies">
            {comment.replies?.map((reply) => (
              <Comment comment={reply} key={reply.id} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
