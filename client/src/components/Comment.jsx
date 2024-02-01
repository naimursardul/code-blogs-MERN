/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { url } from "../features/slices/mainSlice";
import { useSelector } from "react-redux";

const Comment = ({ cmnt }) => {
  const { user } = useSelector((state) => state.mainReducer);
  const [popup, setPopup] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const { c, setError, allComment, setAllComment, i } = cmnt;
  const [updatedComment, setUpdatedComment] = useState(c?.comment);
  //
  //
  //
  // DELETE COMMENT
  const deleteComment = async () => {
    setPopup(false);
    try {
      await axios.delete(url + "/comment/" + c?._id, {
        withCredentials: true,
      });
      if (allComment) {
        allComment.splice(i, 1);
        const newAllComment = [...allComment];
        setAllComment(newAllComment);
      }
      setError(null);
    } catch (err) {
      setError(err);
    }
  };
  //
  //
  //
  // UPDATE COMMENT
  const updateComment = async (e) => {
    e.preventDefault();
    setToggleInput(!toggleInput);
    if (updatedComment) {
      try {
        await axios.put(
          url + "/comment/" + c._id,
          {
            comment: updatedComment,
          },
          { withCredentials: true }
        );
        c.comment = updatedComment;
        setError(null);
      } catch (error) {
        setError(error);
      }
    } else {
      setUpdatedComment(c.comment);
    }
  };
  //
  //
  //
  // JSX
  return (
    <div className="flex-col bg-gray-300 space-y-1 rounded py-3 px-5 md:text-md text-sm ">
      <div className="flex justify-between text-[10px] md:text-[12px]  ">
        <p className="font-bold text-gray-600">@{c?.author}</p>
        <div className="flex md:space-x-4 space-x-2 ">
          <p>{new Date(c?.createdAt).toString().slice(0, 15)}</p>
          <p>{new Date(c?.createdAt).toString().slice(16, 21)}</p>
          {user?._id === c?.userId && (
            <div className="relative flex justify-center items-center md:gap-4 gap-2">
              <div
                className="hover:text-gray-400"
                onClick={() => setToggleInput(!toggleInput)}
              >
                {!toggleInput ? (
                  <FaRegEdit />
                ) : (
                  <IoCheckmarkDoneCircleOutline onClick={updateComment} />
                )}
              </div>
              <div
                className="hover:text-gray-400"
                onClick={() => setPopup(!popup)}
              >
                {!popup ? <RiDeleteBinLine /> : <TiDelete />}
              </div>
              {/* Popup for deleting */}
              {popup && (
                <div className="z-10 scale-up-tr rounded bg-black px-5 py-3 text-white absolute w-60 top-5 right-0">
                  <h3 className="font-semibold">
                    Are you sure want to delete this comment?
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-gray-300 text-black px-3 py-1 rounded hover:text-gray-400 font-semibold"
                      onClick={deleteComment}
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
          )}
        </div>
      </div>
      {toggleInput ? (
        <form onSubmit={updateComment}>
          <input
            className="w-full border-b border-black outline-none bg-transparent"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
        </form>
      ) : (
        <p>{c?.comment} </p>
      )}
    </div>
  );
};

export default Comment;
