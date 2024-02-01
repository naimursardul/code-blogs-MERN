import { useEffect, useState } from "react";
import ProfilePost from "../components/ProfilePost";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../features/slices/mainSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { deleteUser, updateUser } from "../features/slices/userSlice";
import { TiDelete } from "react-icons/ti";
//
//
//
//
//
const Profile = () => {
  const { user } = useSelector((state) => state.mainReducer);
  const updateLoading = useSelector((state) => state.mainReducer.loading);
  const uid = useParams().id;
  const [toggleInput, setToggleInput] = useState(false);
  const [userPost, setUserPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username);

  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const navigate = useNavigate();
  const buttons = ["All", "Uploaded", "Draft"];
  const [selectedBtn, setSelectedBtn] = useState(buttons[0]);
  const doneUserPost = userPost && userPost.filter((uPost) => uPost?.done);
  const draftUserPost = userPost && userPost.filter((uPost) => !uPost?.done);
  //
  //
  //
  // GET POST
  const getUserPost = async (uid) => {
    setLoading(true);
    try {
      const res = await axios.get(url + "/post/user/" + uid, {
        withCredentials: true,
      });
      setUserPost(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserPost(uid);
  }, [uid]);
  //
  //
  //
  // DELETE USER
  const handleDelete = () => {
    dispatch(deleteUser([uid, navigate]));
  };
  //
  //
  //
  // UPDATE USER
  const handleUpdateUser = () => {
    setToggleInput(!toggleInput);
    if (newUsername || newEmail || newPassword) {
      dispatch(
        updateUser([
          uid,
          { username: newUsername, email: newEmail, password: newPassword },
        ])
      );
    }
  };
  //
  //
  //
  // JSX
  if (error) return <Error />;
  else if (loading || updateLoading) return <Loader />;
  else if (user && userPost) {
    return (
      <div className="flex flex-col gap-20 my-10">
        {/* Profile update section */}
        <div className="flex flex-col gap-5 border-l pl-3">
          <div className=" text-3xl md:text-4xl">Profile</div>
          <div className="flex flex-col gap-3">
            {toggleInput ? (
              <input
                type="text"
                placeholder="username"
                defaultValue={user?.username}
                onChange={(e) => setNewUsername(e.target.value)}
                className="py-1 outline-none border-b text-sm"
              />
            ) : (
              <div>{user?.username}</div>
            )}

            {toggleInput ? (
              <input
                type="email"
                placeholder="email"
                defaultValue={user?.email}
                onChange={(e) => setNewEmail(e.target.value)}
                className="py-1 outline-none border-b text-sm"
              />
            ) : (
              <div>{user?.email}</div>
            )}
            {toggleInput ? (
              <input
                type="password"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="py-1 outline-none border-b text-sm"
              />
            ) : (
              <div>Password***</div>
            )}
          </div>
          <div className="relative flex gap-2">
            {toggleInput ? (
              <div
                onClick={handleUpdateUser}
                className="bg-black text-white py-2 px-3 hover:bg-gray-600"
              >
                <IoCheckmarkDoneCircleOutline />
              </div>
            ) : (
              <div
                onClick={() => setToggleInput(!toggleInput)}
                className="bg-black text-white py-2 px-3 hover:bg-gray-600"
              >
                <FaRegEdit />
              </div>
            )}
            <div
              className="bg-black text-white py-2 px-3 hover:bg-gray-600"
              onClick={() => setPopup(!popup)}
            >
              {!popup ? <AiTwotoneDelete /> : <TiDelete />}
            </div>
            {/* Popup for deleting */}
            {popup && (
              <div className="scale-up-tl z-10 scale-up-tr rounded bg-black px-5 py-5 text-white absolute w-60 md:w-80 top-10 left-0 md:left-12 text-sm">
                <h3 className="font-semibold">
                  Are you sure want to delete this account?
                </h3>
                <div className="flex gap-2 mt-5">
                  <button
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:text-gray-400 font-semibold"
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

        {/* Your Posts */}
        <div className="flex flex-col gap-10">
          <h2 className="border-l pl-3 text-3xl md:text-4xl">Your Posts</h2>
          {/* btn */}
          <div className="flex">
            {buttons.map((button, i) => (
              <button
                onClick={() => setSelectedBtn(button)}
                className={
                  `px-4 py-2  font-bold border border-black` +
                  (button === selectedBtn
                    ? ` bg-black text-white hover:bg-gray-500`
                    : ` text-black hover:bg-gray-300 `)
                }
                key={i}
              >
                {button}{" "}
                <span className="font-normal">
                  (
                  {button === buttons[1]
                    ? doneUserPost.length
                    : button === buttons[2]
                    ? draftUserPost.length
                    : userPost.length}
                  )
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {selectedBtn === buttons[1]
              ? doneUserPost.map((uPost) => (
                  <Link key={uPost._id} to={`/post/${uPost._id}`}>
                    <ProfilePost uPost={uPost} />
                  </Link>
                ))
              : selectedBtn === buttons[2]
              ? draftUserPost.map((uPost) => (
                  <Link key={uPost._id} to={`/edit/${uPost._id}`}>
                    <ProfilePost uPost={uPost} />
                  </Link>
                ))
              : userPost.map((uPost) => (
                  <Link key={uPost._id} to={`/post/${uPost._id}`}>
                    <ProfilePost uPost={uPost} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
