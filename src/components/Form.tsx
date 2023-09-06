import { useContext } from "react";
import { CommentsContext } from "../contexts/comments";
import { UserContext } from "../contexts/user";
import "../styles/Form.scss";

const getDate = () => {
  function toString(number: number, padLength: number) {
    return number.toString().padStart(padLength, "0");
  }
  let date = new Date();
  let dateTimeNow =
    toString(date.getFullYear(), 4) +
    "/" +
    toString(date.getMonth() + 1, 2) +
    "/" +
    toString(date.getDate(), 2) +
    " " +
    toString(date.getHours(), 2) +
    ":" +
    toString(date.getMinutes(), 2) +
    ":" +
    toString(date.getSeconds(), 2);
  return dateTimeNow;
};

const Form = ({
  type,
  replyTo,
  setIsAdding,
}: {
  type: string;
  replyTo: number;
  setIsAdding?: (v: boolean) => void;
}) => {
  const user = useContext(UserContext);
  const { comments, setComments } = useContext(CommentsContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let found = false;
    comments.forEach((c) => {
      if (c.id == replyTo) {
        found = true;
      }
    });

    // If the comment is in the replies of another comment
    if (!found) {
      const tmp = comments;
      tmp.forEach((c) => {
        c.replies?.forEach((r) => {
          if (r.id == replyTo) {
            c.replies?.push({
              id: Math.floor(Math.random() * 1000),
              content:
                "@" + r.user.username + " " + e.currentTarget.usercomment.value,
              createdAt: getDate(),
              score: 0,
              user: user,
            });
          }
        });
      });
      setComments([...tmp]);
      console.log(tmp);
      if (setIsAdding) setIsAdding(false);
      e.currentTarget.scrollIntoView({ behavior: "smooth" });
    }

    // If the comment is in the main line of discussion
    if (replyTo < 0 || found) {
      if (replyTo < 0) {
        let a = {
          id: Math.floor(Math.random() * 1000),
          content: e.currentTarget.usercomment.value,
          createdAt: getDate(),
          score: 0,
          user: user,
        };
        const b = [...comments, a];
        console.log(b);
        setComments(b);
        return;
      }
      const tmp = comments;
      tmp.forEach((comment) => {
        if (comment.id == replyTo) {
          comment.replies?.push({
            id: Math.floor(Math.random() * 1000),
            content: e.currentTarget.usercomment.value,
            createdAt: getDate(),
            score: 0,
            user: user,
          });
        } else {
          comment.replies?.forEach((c) => {
            if (c.id == replyTo) {
              c.replies?.push({
                id: Math.floor(Math.random() * 1000),
                content: e.currentTarget.usercomment.value,
                createdAt: getDate(),
                score: 0,
                user: user,
              });
            }
          });
        }
      });
      setComments(tmp);
      if (setIsAdding) setIsAdding(false);
      e.currentTarget.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form id="insert" onSubmit={handleSubmit}>
      <img src={user.image} alt={user.username} />
      <textarea name="usercomment" placeholder="Add a comment..."></textarea>
      <button type="submit">{type}</button>
    </form>
  );
};

export default Form;
