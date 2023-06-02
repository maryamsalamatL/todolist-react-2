import {
  FaRegCheckCircle,
  FaRegCircle,
  FaTrashAlt,
  FaRegStar,
} from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { useState } from "react";
import EditTodo from "./EditTodo";
import { useTodosActions } from "./provider/TodoProvider";

const Todo = ({ todo, styles, date }) => {
  const { removeHandler, completeHandler, importantHandler } =
    useTodosActions();
  const [edit, setEdit] = useState({ id: null, isCompleted: false, text: "" });

  const renderTodo = () => {
    return (
      <div
        className={`${styles.list} ${
          todo.isCompleted === true && styles.Completed
        }`}
        key={todo.id}
      >
        <div className={styles.textBox}>
          <span className={styles.text}>{todo.text}</span>
          <span className={styles.date}>
            {new Date(date).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className={styles.btnBox}>
          <button
            className={styles.btn}
            onClick={() => importantHandler(todo.id)}
          >
            {todo.isImportant ? (
              <BsFillStarFill className={styles.important} />
            ) : (
              <FaRegStar />
            )}
          </button>
          <button
            className={styles.btn}
            onClick={() => completeHandler(todo.id)}
          >
            {todo.isCompleted === false ? (
              <span>
                <FaRegCircle />
              </span>
            ) : (
              <span>
                <FaRegCheckCircle />
              </span>
            )}
          </button>
          <button className={styles.btn} onClick={() => setEdit(todo)}>
            edit
          </button>
          <button
            className={`${styles.btn} ${styles.delete}`}
            onClick={() => removeHandler(todo.id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      {edit.id ? <EditTodo todo={todo} setEdit={setEdit} /> : renderTodo()}
    </div>
  );
};

export default Todo;
