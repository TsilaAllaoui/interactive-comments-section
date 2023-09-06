import { useContext, useEffect } from "react";
import "./App.scss";
import Comment from "./components/Comment";
import Form from "./components/Form";
import { CommentsContext } from "./contexts/comments";

function App() {
  const comments = useContext(CommentsContext).comments;

  useEffect(() => {
    console.log("changed");
  }, [comments]);

  return (
    <div id="app">
      <p>{comments.length}</p>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.content} />
      ))}
      <Form type="SEND" replyTo={-1} />
    </div>
  );
}

export default App;
