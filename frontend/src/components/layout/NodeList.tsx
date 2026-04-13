import Node from "../ui/Node";

const NodeList = ({ nodes }) => {
  return (
    <>
      <p className="font-pixel text-yellow-300">Your nodes: </p>
      <div className="flex justify-center">
        {nodes.map((node) => (
          <Node
            key={node.id}
            id={node.id}
            title={node.title}
            description={node.description}
          />
        ))}
      </div>
    </>
  );
};

export default NodeList;
