import Card from "./Card";

interface INodeProps {
  id: string;
  title: string;
  description: string;
}

const Node = ({ id, title, description }: INodeProps) => {
  return (
    <>
      <Card className="hover:brightness-110 hover:-translate-y-1 transition-all duration-200">
        <h1>Title: {title}</h1>
        <p>Description: {description}</p>
        <p>Id: {id}</p>
      </Card>
    </>
  );
};

export default Node;
