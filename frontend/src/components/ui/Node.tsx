import Card from "./Card";
import { useTranslation } from "react-i18next";

interface INodeProps {
  title: string;
  description: string;
}

const Node = ({ title, description }: INodeProps) => {
  const { t } = useTranslation("editor");

  return (
    <>
      <Card className="hover:brightness-110 hover:-translate-y-1 transition-all duration-200">
        <h1>
          {t("node.titlePrefix")} {title}
        </h1>
        <p>
          {t("node.descriptionPrefix")} {description}
        </p>
      </Card>
    </>
  );
};

export default Node;
