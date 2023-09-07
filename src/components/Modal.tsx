import { useEffect } from "react";
import "../styles/Modal.scss";

const ModalBox = ({
  setIsDeleting,
  deleteComment,
}: {
  setIsDeleting: (b: any) => void;
  deleteComment: () => void;
}) => {
  useEffect(() => {
    const e = document.querySelector("#modal") as HTMLElement;
    e.scrollIntoView({ behavior: "smooth" });
    const root = document.querySelector("#root") as HTMLElement;
    root.style.overflow = "hidden";
  }, []);

  return (
    <div id="modal" onClick={setIsDeleting}>
      <div id="container">
        <h1>Delete comment</h1>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div id="buttons">
          <button onClick={setIsDeleting}>NO, CANCEL</button>
          <button
            onClick={() => {
              const root = document.querySelector("#root") as HTMLElement;
              root.style.overflow = "auto";
              setIsDeleting(false);
              deleteComment();
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
