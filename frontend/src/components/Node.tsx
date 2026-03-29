const Node = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center border-2 border-blue-300">
        <h1>Title: {title}</h1>
        <p>Description: {description}</p>
      </div>
    </>
  );
};

export default Node;
