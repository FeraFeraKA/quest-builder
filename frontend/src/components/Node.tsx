import DeleteNode from "./DeleteNode";

const Node = ({ id, title, description, setNodes }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center border-2 border-blue-300">
        <h1>Title: {title}</h1>
        <p>Description: {description}</p>
        <DeleteNode id={id} setNodes={setNodes} />
      </div>
    </>
  );
};

export default Node;
