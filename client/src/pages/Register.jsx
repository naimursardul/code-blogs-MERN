import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoWarningOutline } from "react-icons/io5";
import { registerUser } from "../features/slices/userSlice";

const Register = () => {
  const { registerError } = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] sm:w-[60%] md:w-[50%]  gap-2 "
      >
        <div className="w-full pb-1 text-xl font-bold">Create an account</div>
        <input
          className="w-full p-3 border-2 border-black"
          type="text"
          placeholder="Enter your username"
          name="username"
          onChange={onInputChange}
        />
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
          Register
        </button>
        {registerError && (
          <div className="flex gap-2 justify-center items-center text-red-700 text-sm">
            <IoWarningOutline />
            <span>Something went wrong!</span>
          </div>
        )}
        <div className="w-full text-left py-2 text-sm flex gap-4">
          <div>Already have an account?</div>
          <div className="hover:text-black text-gray-600">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
