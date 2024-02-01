// eslint-disable-next-line react/prop-types
const Error = ({ message }) => {
  return (
    <h1 className="flex justify-center items-center text-xl font-thin min-h-[70vh]">
      {message ? message : "Oops! Something went wrong."}
    </h1>
  );
};

export default Error;
