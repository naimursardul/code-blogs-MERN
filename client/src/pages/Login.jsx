import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { loginUser } from "../features/slices/userSlice";

const Login = () => {
  const [info, setInfo] = useState({});
  const { loginError, user } = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
  };

  return (
    <div className="h-[70vh] w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] sm:w-[60%] md:w-[50%]  gap-2 "
      >
        <div className="text-left w-full pb-1 text-xl font-bold">
          Log in to your account
        </div>
        <input
          className="w-full p-3 border-2 border-black"
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={onInputChange}
        />
        <input
          className="w-full p-3 border-2 border-black"
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="w-full py-3 bg-black hover:bg-gray-600 text-white font-bold border-none outline-none"
        >
          Log in
        </button>
        {user && <Navigate to="/"></Navigate>}
        {loginError && (
          <div className="flex gap-2 justify-center items-center text-red-700 text-sm">
            <IoWarningOutline />
            <span>Something went wrong!</span>
          </div>
        )}
        <div className="w-full text-left py-2 text-sm flex space-x-4">
          <div>New here?</div>
          <div className="hover:text-black text-gray-600">
            <Link to="/register">Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
