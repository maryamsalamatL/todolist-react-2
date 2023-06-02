import Todo from "./Todo";
import styles from "./TodoList.module.css";

import { useTodos, useStatus } from "./provider/TodoProvider";

const TodoList = () => {
  const todos = useTodos();
  const status = useStatus();
  const renderTodos = () => {
    if (todos.length === 0)
      return (
        <div>{status === "home" ? "add some todos" : "there is no todos"}</div>
      );

    return todos.map((todo) => {
      return (
        <Todo todo={todo} key={todo.id} styles={styles} date={todo.date} />
      );
    });
  };

  return <div className={styles.container}>{renderTodos()}</div>;
};

export default TodoList;
