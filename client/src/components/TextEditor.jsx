import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { TOOLBAR_OPTIONS } from "../features/helper/helper";

const TextEditor = ({ props }) => {
  const { setDesc, desc, isUpdate } = props;
  const [quill, setQuill] = useState();

  useEffect(() => {
    // if (quill === null) return;
    if (isUpdate) {
      quill && quill.setContents(desc);
    }
    quill &&
      quill.on("text-change", () => {
        setDesc(quill.getContents());
      });
  }, [quill, desc, setDesc, isUpdate]);

  //   Quill setup
  const wrapper = useRef();
  useEffect(() => {
    const editor = document.createElement("div");
    const element = wrapper.current;
    element.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
    return () => {
      if (element) {
        element.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className="create_post_container bg-[#f3f3f3] border"
    ></div>
  );
};

export default TextEditor;
