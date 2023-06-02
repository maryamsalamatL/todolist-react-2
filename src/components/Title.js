import { useStatus } from "./provider/TodoProvider";

const Title = () => {
  const status = useStatus();
  const renderTitle = () => {
    if (status === "home") {
      return <h1>My Todo List</h1>;
    } else if (status === "all") {
      return <h1>All Todos</h1>;
    } else if (status === "important") {
      return <h1>Important Todos</h1>;
    } else if (status === "completed") {
      return <h1>Completed Todos</h1>;
    } else if (status === "unCompleted") {
      return <h1>Uncompleted Todos</h1>;
    }
  };
  return (
    <>
      {renderTitle()}
      <span>{new Date().toLocaleDateString("en-GB")}</span>
    </>
  );
};

export default Title;
