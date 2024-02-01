/* eslint-disable react/prop-types */
const ProfilePost = ({ uPost }) => {
  return (
    <div className="flex items-start w-full gap-2 md:gap-4">
      <div className="w-[35%] flex items-center py-1">
        <img className="w-full" src={uPost?.photo} alt="" />
      </div>
      <div className="w-[65%] flex flex-col gap-1 md:gap-2 lg:gap-3">
        <h1 className="font-semibold md:text-2xl lg:text-3xl sm:text-xl text-lg leading-6 md:leading-7">
          {uPost?.title}
        </h1>
        <div className="flex justify-between text-[10px] md:text-[12px] lg:text-[14px] ">
          <p>@{uPost?.username}</p>
          <div className="flex gap-[10px]">
            <p>{new Date(uPost?.createdAt).toString().slice(0, 15)}</p>
            <p>{new Date(uPost?.createdAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <div className="sm:text-md md:text-lg lg:text-xl text-sm">
          {uPost?.shortDesc.slice(0, 150)}{" "}
          <span className="font-bold">...Read more</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
