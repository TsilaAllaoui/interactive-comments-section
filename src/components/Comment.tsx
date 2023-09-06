import { useContext, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { UserContext } from "../contexts/user";
import { IComment } from "../interfaces/Comment";
import "../styles/Comment.scss";
import Form from "./Form";
import { CommentsContext } from "../contexts/comments";

function Comment({ comment }: { comment: IComment }) {
  const userName = useContext(UserContext).username;
  const { comments, setComments } = useContext(CommentsContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleReply = (_e: React.MouseEvent<HTMLDivElement>) => {
    setIsAdding(!isAdding);
  };

  const handleReactAction = (add: boolean) => {
    let tmp = comments;
    const appendix = add ? 1 : -1;
    tmp.forEach((c) => {
      if (c.id == comment.id) {
        c.score += appendix;
      } else {
        c.replies?.forEach((_c) => {
          if (_c.id == comment.id) {
            _c.score += appendix;
          }
        });
      }
    });
    setComments([...tmp]);
  };

  const handleDelete = () => {
    let tmp = comments;
    tmp.forEach((c) => {
      if (c.id == comment.id) {
        tmp = tmp.filter((c) => c.id != comment.id);
      } else {
        c.replies?.forEach((_c) => {
          if (_c.id == comment.id) {
            const pos = c.replies?.findIndex((a) => a.id == _c.id);
            c.replies = c.replies?.filter((_a, i) => i != pos);
            console.log(c.replies);
          }
        });
      }
    });
    setComments([...tmp]);
    setComments([...comments.filter((c) => c.id != comment.id)]);
  };

  return (
    <div className="comment-container">
      <div className="comment">
        <div id="reactions">
          <BiPlus id="plus" onClick={() => handleReactAction(true)} />
          <p>{comment.score}</p>
          <BiMinus id="minus" onClick={() => handleReactAction(false)} />
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
                  <div id="delete" onClick={handleDelete}>
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
              <Comment comment={reply} key={reply.content} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
