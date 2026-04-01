import AddNode from "./AddNode";
import Node from "./Node";

const NodeList = ({ nodes, setNodes, questId }) => {
  return (
    <>
      <AddNode setNodes={setNodes} questId={questId} />
      <div className="flex justify-center">
        <p>Your nodes: </p>
        {nodes.map((node) => (
          <Node
            key={node.id}
            id={node.id}
            title={node.title}
            description={node.description}
            setNodes={setNodes}
          />
        ))}
      </div>
    </>
  );
};

export default NodeList;
