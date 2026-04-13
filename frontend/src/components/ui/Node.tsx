import Card from "./Card";

interface INodeProps {
  title: string;
  description: string;
}

const Node = ({ title, description }: INodeProps) => {
  return (
    <>
      <Card className="hover:brightness-110 hover:-translate-y-1 transition-all duration-200">
        <h1>Название: {title}</h1>
        <p>Описание: {description}</p>
      </Card>
    </>
  );
};

export default Node;
