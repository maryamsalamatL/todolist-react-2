import styles from "./Sort.module.css";
import { useEffect } from "react";
import { useTodosActions, useStatus } from "../provider/TodoProvider";

const Sort = ({ sortValue, setSortValue }) => {
  const status = useStatus();
  const { sortHandler } = useTodosActions();

  useEffect(() => {
    sortHandler(sortValue);
  }, [sortValue, status]);
  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={sortValue}
        onChange={(e) => setSortValue(e.target.value)}
      >
        <option value="newest" className={styles.option}>
          Newest
        </option>
        <option value="oldest" className={styles.option}>
          Oldest
        </option>
      </select>
    </div>
  );
};

export default Sort;
