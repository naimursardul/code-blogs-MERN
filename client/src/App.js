import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findCookie } from "./features/helper/helper";
import { refetchUser } from "./features/slices/userSlice";
import Error from "./components/Error";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (findCookie("token")) dispatch(refetchUser());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="px-6 sm:px-16 md:px-32 lg:px-48 min-h-[70vh]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="*"
            element={<Error message={"Nothing found!"} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post/:id" element={<PostDetails />} />
          <Route exact path="/write" element={<CreatePost />} />
          <Route exact path="/edit/:id" element={<UpdatePost />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
