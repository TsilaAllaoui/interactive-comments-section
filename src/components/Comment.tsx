import { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { CommentsContext } from "../contexts/comments";
import { UserContext } from "../contexts/user";
import { IComment } from "../interfaces/Comment";
import "../styles/Comment.scss";
import Form from "./Form";
import ModalBox from "./Modal";

function Comment({ comment }: { comment: IComment }) {
  const userName = useContext(UserContext).username;
  const { comments, setComments } = useContext(CommentsContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleReply = (_e: React.MouseEvent<HTMLDivElement>) => {
    setIsAdding(!isAdding);
  };

  const handleReactAction = (add: boolean) => {
    if (isEdited) return;
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
    setIsDeleting(true);
  };

  const deleteComment = () => {
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(event.currentTarget.value);
  };
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tmp = comments;
    tmp.forEach((c) => {
      if (c.id == comment.id) {
        c.content = editValue;
      } else {
        c.replies?.forEach((_c) => {
          if (_c.id == comment.id) {
            _c.content = editValue;
          }
        });
      }
    });
    setEditValue("");
    e.currentTarget.scrollIntoView({ behavior: "smooth" });
    setComments([...tmp]);
  };

  useEffect(() => {
    if (!isDeleting) {
      const root = document.querySelector("#root") as HTMLElement;
      root.style.overflow = "scroll";
    }
  }, [isDeleting]);

  return (
    <div className="comment-container">
      {isDeleting ? (
        <ModalBox
          deleteComment={deleteComment}
          setIsDeleting={() => setIsDeleting(false)}
        />
      ) : null}
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
                  <div
                    id="edit"
                    onClick={() => {
                      setIsEdited(true);
                      setEditValue(comment.content);
                    }}
                  >
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
            {!isEdited ? (
              <p>{comment.content}</p>
            ) : (
              <form onSubmit={handleEdit}>
                <textarea
                  name="usercommentedit"
                  placeholder={comment.content}
                  value={editValue}
                  onChange={handleChange}
                ></textarea>
                <button type="submit">Edit</button>
              </form>
            )}
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
