import axios from "axios";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../features/slices/mainSlice";
import Loader from "../components/Loader";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import TextEditor from "../components/TextEditor";
//
//
//
//
//
//
const UpdatePost = () => {
  const { user } = useSelector((state) => state.mainReducer);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = {
    title,
    desc,
    username: user?.username,
    userId: user?._id,
    categories: cats,
  };

  //
  //
  //
  // ADD CATEGORY
  const updateCats = (e) => {
    e.preventDefault();
    setCats([...cats, cat]);
    setCat("");
  };
  //
  //
  //
  // DELETE CATAGORY
  const deleteCat = (index) => {
    console.log(index);
    const updatedCats = [...cats];
    updatedCats.splice(index, 1);
    console.log(updatedCats);
    setCats(updatedCats);
  };
  //
  //
  //
  // GET POSTDATA
  const getPostDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(url + "/post/" + id);
      const result = res.data;
      setTitle(result.title);
      setCats(result.categories);
      setShortDesc(result.shortDesc);
      setDesc(result.desc);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPostDetails(id);
  }, [id]);
  //
  //
  //
  // UPDATE POST
  let isContinue = true;
  const handleSubmit = async (isDone) => {
    //
    //
    //
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(url + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const result = res.data;
        setUploadError(null);
        postData.photo = result.imageUrl;
      } catch (error) {
        isContinue = false;
        setUploadError(error);
      }
    }
    //
    //
    //
    if (isContinue) {
      postData.done = isDone;
      setLoading(true);
      try {
        const res = await axios.put(url + "/post/" + id, postData, {
          withCredentials: true,
        });
        const result = res.data;
        isDone
          ? navigate("/post/" + result._id)
          : navigate("/profile/" + user?._id);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  };
  //
  //
  //
  //  JSX
  if (loading) return <Loader />;
  else
    return (
      <div className="flex-col space-y-4 mt-12 mb-20 px-3 sm:px-0">
        {/* Page title  */}
        <h1 className=" text-4xl">Update the post</h1>
        <div className="felx-col space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full outline-none py-2 px-2 text-sm"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/* File upload */}
          <div>
            <input
              type="file"
              // onClick={() => setUploadError(null)}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {uploadError && (
              <div className="mt-1 flex gap-1 text-center justify-start items-start text-red-600">
                <MdErrorOutline className="text-lg pt-[1px] md:pt-1" />
                <div className="md:text-sm text-[12px]">
                  Error in uploading! [Note: Only .jpg or .jpeg or .png format
                  is allowed and filesize should be under 5mb]{" "}
                </div>
              </div>
            )}
          </div>
          {/* ShortDesc */}
          <div>
            <input
              type="text"
              placeholder="Enter Short description"
              className="w-full outline-none py-2 px-2 text-sm"
              onChange={(e) => setShortDesc(e.target.value)}
              value={shortDesc}
            />
          </div>
          {/* Add catagory */}
          <form className="flex space-x-1">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="text"
              value={cat}
              placeholder="Enter post catagory"
              className="outline-none py-2 px-2"
            />
            <button
              onClick={updateCats}
              className="bg-black text-white text-bold py-2 px-3"
            >
              Add
            </button>
          </form>
          {/* Catagories */}
          <div className="flex flex-wrap gap-2 ">
            {cats.map((c, index) => (
              <div
                key={index}
                className=" flex flex-nowrap justify-center items-center space-x-1 bg-gray-200 py-1 px-2 rounded-lg text-sm font-bold cursor-pointer"
              >
                <p> {c}</p>
                <TiDeleteOutline onClick={() => deleteCat(index)} />
              </div>
            ))}
          </div>
          {/* Textarea */}
          <TextEditor props={{ desc, setDesc, isUpdate: true }} />
          {/* Button */}
          <div className="flex justify-center gap-3">
            <button
              className="bg-black text-white text-bold px-5 py-3  hover:bg-gray-600"
              onClick={() => handleSubmit(true)}
            >
              Update
            </button>
            <button
              className="bg-black text-white text-bold px-5 py-3  hover:bg-gray-600"
              onClick={() => handleSubmit(false)}
            >
              Save as draft
            </button>
          </div>
          {/* Error message */}
          {(uploadError || error) && (
            <div className="mt-1 gap-1 flex text-center justify-center items-start text-red-600">
              <MdErrorOutline className="text-lg pt-[1px] md:pt-1" />
              <div className="md:text-sm text-[12px]">
                Oops! There is a problem uploading the post.
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default UpdatePost;
