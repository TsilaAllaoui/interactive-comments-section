import { useEffect } from "react";
import "../styles/Modal.scss";

const ModalBox = ({
  setIsDeleting,
  deleteComment,
}: {
  setIsDeleting: (b: any) => void;
  deleteComment: (a: any) => void;
}) => {
  useEffect(() => {
    const root = document.querySelector("#root") as HTMLElement;
    root.style.overflow = "hidden";
  }, []);

  return (
    <div id="modal" onClick={setIsDeleting}>
      <div id="container">
        <h1>Delete comment?</h1>
        <div id="buttons">
          <button onClick={deleteComment}>Yes</button>
          <button onClick={setIsDeleting}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
