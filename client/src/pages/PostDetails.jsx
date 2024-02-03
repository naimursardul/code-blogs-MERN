import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { url } from "../features/slices/mainSlice";
import axios from "axios";
import Comment from "../components/Comment";
import Desc from "../components/Desc";
//
//
//
//
//
const PostDetails = () => {
  const id = useParams().id;
  const { user } = useSelector((state) => state.mainReducer);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState();

  const commentData = {
    comment,
    author: user?.username,
    postId: id,
    userId: user?._id,
  };

  //
  //
  //
  // GET POST DETAILS
  const getPostDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(url + "/post/" + id);
      const result = res.data;
      setError(null);
      setLoading(false);
      setPostDetails(result);
    } catch (error) {
      setError(error);
      console.log("error");
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPostDetails(id);
    getAllComments(id);
  }, [id]);
  //
  //
  //
  // DELETE POST
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(url + "/post/" + id, {
        withCredentials: true,
      });
      navigate("/");
      setLoading(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };
  //
  //
  //
  // CREATE COMMENT
  const createComment = async (e) => {
    e.preventDefault();
    if (comment) {
      try {
        const res = await axios.post(url + "/comment", commentData, {
          withCredentials: true,
        });
        const newComment = res.data;
        setComment("");
        if (allComment) allComment.push(newComment);
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
  };
  //
  //
  //
  // GET COMMENTS
  const getAllComments = async (postId) => {
    try {
      const result = await axios.get(url + "/comment/post/" + postId);
      setAllComment(result.data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };
  //
  //
  //

  // JSX TO RETURN

  if (error) return <Error />;
  else if (loading) return <Loader />;
  else if (postDetails) {
    return (
      <div className="w-full flex flex-col gap-3 my-4 sm:my-8 md:my-14">
        {/* Title */}
        <div className="flex justify-between">
          <h1 className="font-bold sm:text-4xl text-3xl mr-8">
            {postDetails?.title}
          </h1>
          {user?._id === postDetails?.userId && (
            <div className=" flex gap-2 items-center">
              <div
                className="hover:text-gray-400 cursor-pointer"
                onClick={() => navigate("/edit/" + id)}
              >
                <FaRegEdit />
              </div>
              <div
                className="relative hover:text-gray-400 cursor-pointer"
                onClick={() => setPopup(!popup)}
              >
                {!popup ? <AiTwotoneDelete /> : <TiDelete />}
                {/* Popup for deleting */}
                {popup && (
                  <div className="z-5 scale-up-tr rounded bg-black px-5 py-5 text-white absolute w-80 top-8 right-0">
                    <h3 className="font-semibold">
                      Are you sure want to delete this post?
                    </h3>
                    <div className="flex gap-2 mt-5">
                      <button
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:text-gray-400 font-semibold cursor-pointer"
                        onClick={handleDelete}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:text-gray-400 font-semibold"
                        onClick={() => setPopup(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Post details */}
        <div className="flex justify-start gap-5 font-semibold text-[10px] sm:text-[12px] text-gray-500">
          <p>by @{postDetails?.username.toLowerCase()}</p>
          <div className="flex gap-[10px]">
            <p>{new Date(postDetails?.createdAt).toString().slice(0, 15)}</p>
            <p>{new Date(postDetails?.createdAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        {/* Post image */}
        <div className=" flex justify-center items-center ">
          <img className="max-h-80" src={postDetails?.photo} alt="" />
        </div>
        {/* Paragraph */}
        <div>
          <Desc desc={postDetails?.desc} />
        </div>
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-start items-center mt-10">
          <h3 className="font-semibold text-sm mr-1">Categories:</h3>
          {postDetails?.categories &&
            postDetails.categories.map((category, index) => (
              <div
                key={index}
                className="border-black bg-gray-300 py-2 px-3 rounded-xl text-[12px] font-bold"
              >
                {category}
              </div>
            ))}
        </div>
        {/* Comments */}
        <div className="w-full flex flex-col mt-5">
          <h3 className="font-semibold text-sm mb-3">Commnets:</h3>
          <div className="flex flex-col gap-2">
            {allComment &&
              allComment.map((c, i) => (
                <Comment
                  cmnt={{
                    c,
                    setError,
                    allComment,
                    setAllComment,
                    i,
                  }}
                  key={c._id}
                />
              ))}
          </div>
        </div>
        {/* Add comment */}
        {user ? (
          <form className="flex flex-col sm:flex-row gap-2 justify-between mt-2">
            <input
              type="text"
              placeholder="Add your comment..."
              className="w-full sm:w-[75%] px-2 py-4 border rounded outline-none"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 border-black rounded text-white font-bold py-4 px-4 w-full sm:w-[23%]"
              onClick={createComment}
            >
              Add
            </button>
          </form>
        ) : (
          <Link
            className="mt-2  bg-black hover:bg-gray-700 border-black rounded text-white py-4 px-4 w-full md:w-[40%] text-center "
            to="/login"
          >
            Please! Login to add Comment
          </Link>
        )}
      </div>
    );
  }
};

export default PostDetails;
