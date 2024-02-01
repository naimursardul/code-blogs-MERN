const Footer = () => {
  return (
    <div className="bg-black w-full mt-10">
      <div className="flex justify-around items-center text-white py-16 text-[11px] sm:text-sm md:text-md">
        <div className="flex flex-col justify-center items-start gap-2">
          <div>Featured blogs</div>
          <div>Most viewed</div>
          <div>Readers choice</div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <div>Forum</div>
          <div>Support</div>
          <div>Recent posts</div>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <div>Privacy policy</div>
          <div>About us</div>
          <div>Terms and Conditions</div>
          <div>Terms and Services</div>
        </div>
      </div>
      <div className="pb-3 pt-0 sm:pt-2 text-center text-[9px] md:text-[11px] text-white ">
        All rights reserved @Code Blogs 2024
      </div>
    </div>
  );
};

export default Footer;
