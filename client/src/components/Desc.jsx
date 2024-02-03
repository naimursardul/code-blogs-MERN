import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Desc = ({ desc }) => {
  const [quill, setQuill] = useState();

  useEffect(() => {
    quill && quill.setContents(desc);
  }, [quill, desc]);

  //   Quill setup
  const wrapper = useRef();
  useEffect(() => {
    const editor = document.createElement("div");
    const element = wrapper.current;
    element.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    setQuill(q);
    q.disable();
    return () => {
      if (element) {
        element.innerHTML = "";
      }
    };
  }, []);

  return <div ref={wrapper} className="desc_container bg-transparent "></div>;
};

export default Desc;
