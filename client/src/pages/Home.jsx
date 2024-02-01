import { useSelector } from "react-redux";
import HomePost from "../components/HomePost";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Error from "../components/Error";

const Home = () => {
  const { allPost, loading, error } = useSelector((state) => state.mainReducer);

  if (loading) return <Loader />;
  else if (error) return <Error />;
  else {
    return (
      <div className="min-h-[70vh] flex flex-col py-2 md:py-11 gap-6">
        {allPost.map(
          (post) =>
            post?.done && (
              <Link key={post._id} to={`/post/${post._id}`}>
                <HomePost post={post} />
              </Link>
            )
        )}
      </div>
    );
  }
};

export default Home;
