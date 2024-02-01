export const findCookie = (cookieName) => {
  const cookies = document.cookie || "";
  const cookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith(`${cookieName}=`));
  return cookie;
};

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["image", "blockquote", "code-block"],
  [{ align: [] }],
  ["clean"],
];
