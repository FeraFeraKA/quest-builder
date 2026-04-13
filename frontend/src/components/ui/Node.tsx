import Card from "./Card";

const Node = ({ id, title, description }) => {
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
