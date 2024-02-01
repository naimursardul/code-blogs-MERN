import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../features/slices/postSlice";
import { logoutUser } from "../features/slices/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.mainReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (searchPrompt && pathname === "/") {
      navigate(`?search=${searchPrompt}`);
      dispatch(getAllPost("?search=" + searchPrompt));
    } else {
      navigate();
      dispatch(getAllPost(""));
    }
  }, [searchPrompt, navigate, pathname, dispatch]);

  return (
    <div className="flex justify-between items-center py-5 px-3 lg:px-36 md:px-24 sm:px-16 ">
      {/* Brand Name */}
      <h1 className="text-sm md:text-lg lg:text-xl font-extrabold">
        <Link to="/" onClick={() => setSearchPrompt("")}>
          Code Blogs
        </Link>
      </h1>
      {/* SearchBox */}
      {pathname === "/" && (
        <div className="flex justify-center items-center gap-2">
          <IoIosSearch className={"text-lg md:text-xl"} />
          <input
            className="max-sm:w-40 md:w-72 outline-none md:text-sm text-[14px] bg-transparent"
            placeholder="Search post..."
            onChange={(e) => setSearchPrompt(e.target.value)}
            value={searchPrompt}
          />
        </div>
      )}
      {/* MenuBar */}
      <div className="relative z-10 cursor-pointer">
        <FaBars onClick={() => setMenu(!menu)} />
        {menu ? (
          <div className="scale-up-tr flex flex-col gap-2 md:gap-3 text-sm md:text-md absolute top-8 right-0 bg-black text-white py-4 px-6 w-40 text-right">
            {user ? (
              <>
                <Link
                  onClick={() => setMenu(!menu)}
                  className="hover:text-gray-400"
                  to="/write"
                >
                  Write
                </Link>
                <Link
                  onClick={() => setMenu(!menu)}
                  className="hover:text-gray-400"
                  to={"/profile/" + user._id}
                >
                  Profile
                </Link>
                <Link
                  onClick={() => setMenu(!menu)}
                  className="hover:text-gray-400"
                  to="/write"
                >
                  My Blogs
                </Link>
                <Link
                  onClick={() => [setMenu(!menu), dispatch(logoutUser())]}
                  className="hover:text-gray-400"
                  to="/"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <div className={pathname === "/register" ? "hidden" : "block"}>
                  <Link
                    className="hover:text-gray-400"
                    onClick={() => setMenu(!menu)}
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
                <div
                  onClick={() => setMenu(!menu)}
                  className={pathname === "/login" ? "hidden" : "block"}
                >
                  <Link className="hover:text-gray-400" to="login">
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
