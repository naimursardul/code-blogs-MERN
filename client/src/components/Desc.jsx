import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Desc = ({ desc }) => {
  const [quill, setQuill] = useState();

  useEffect(() => {
    // if (quill === null) return;
    quill && quill.setContents(desc);
  }, [quill]);

  //   Quill setup
  const wrapper = useRef();
  useEffect(() => {
    const editor = document.createElement("div");
    wrapper.current.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    setQuill(q);
    q.disable();
    return () => {
      if (wrapper.current) {
        wrapper.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={wrapper} className="desc_container bg-transparent "></div>;
};

export default Desc;
