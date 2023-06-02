import styles from "./SideBar.module.css";
import { useTodosActions } from "../provider/TodoProvider";
import { FaBars } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";
import { useRef, useEffect } from "react";
import Header from "../header/Header";
import {
  useAllTodos,
  useStatus,
  useStatusActions,
} from "../provider/TodoProvider";

const SideBar = () => {
  const status = useStatus();
  const setStatus = useStatusActions();
  const sideBarRef = useRef();
  const todos = useAllTodos();
  const { filterHandler } = useTodosActions();

  const sideBarHandler = (value) => {
    value === "show"
      ? (sideBarRef.current.className = `${styles.container} ${styles.show}`)
      : (sideBarRef.current.className = styles.container);
  };
  useEffect(() => {
    filterHandler(status);
  }, [status]);

  return (
    <>
      <Header />
      <FaBars
        className={styles.listIcon}
        onClick={() => sideBarHandler("show")}
      />
      <div className={styles.container} ref={sideBarRef}>
        <ul className={styles.ul}>
          <li
            className={
              status === "home" ? `${styles.li} ${styles.selected}` : styles.li
            }
            data-value="home"
            onClick={(e) => setStatus(e.target.dataset.value)}
          >
            <span>add todo</span>
          </li>
          <li
            className={
              status === "all" ? `${styles.li} ${styles.selected}` : styles.li
            }
            data-value="all"
            onClick={(e) => setStatus(e.target.dataset.value)}
          >
            <span>all</span>
            {todos.length ? (
              <span className={styles.count}>{todos.length}</span>
            ) : (
              ""
            )}
          </li>
          <li
            className={
              status === "important"
                ? `${styles.li} ${styles.selected}`
                : styles.li
            }
            data-value="important"
            onClick={(e) => setStatus(e.target.dataset.value)}
          >
            <span>important</span>
            {todos.filter((todo) => todo.isImportant).length ? (
              <span className={styles.count}>
                {todos.filter((todo) => todo.isImportant).length}
              </span>
            ) : (
              ""
            )}
          </li>
          <li
            className={
              status === "completed"
                ? `${styles.li} ${styles.selected}`
                : styles.li
            }
            data-value="completed"
            onClick={(e) => setStatus(e.target.dataset.value)}
          >
            <span>completed</span>
            {todos.filter((todo) => todo.isCompleted).length ? (
              <span className={styles.count}>
                {todos.filter((todo) => todo.isCompleted).length}
              </span>
            ) : (
              ""
            )}
          </li>
          <li
            className={
              status === "unCompleted"
                ? `${styles.li} ${styles.selected}`
                : styles.li
            }
            data-value="unCompleted"
            onClick={(e) => setStatus(e.target.dataset.value)}
          >
            <span>uncompleted</span>
            {todos.filter((todo) => !todo.isCompleted).length ? (
              <span className={styles.count}>
                {todos.filter((todo) => !todo.isCompleted).length}
              </span>
            ) : (
              ""
            )}
          </li>
        </ul>
        <BsChevronLeft
          className={styles.closeIcon}
          onClick={() => sideBarHandler("hide")}
        />
      </div>
    </>
  );
};
export default SideBar;
