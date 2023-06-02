import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import SideBar from "./sidebar/SideBar";
import Title from "./Title";
import TodoProvider from "./provider/TodoProvider";

import styles from "./TodoApp.module.css";

const TodoApp = () => {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <SideBar />
        <div className={styles.body}>
          <div className={styles.title}>
            <Title />
          </div>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;
