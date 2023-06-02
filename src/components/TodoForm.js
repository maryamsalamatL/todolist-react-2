import { useState } from "react";
import styles from "./TodoForm.module.css";
import FormComponent from "../common/FormComponent";
import Sort from "./sort/Sort";
import { useTodosActions, useStatus } from "./provider/TodoProvider";
const TodoForm = () => {
  const { addTodoHandler } = useTodosActions();
  const status = useStatus();
  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      alert("enter todo");
      return;
    }

    addTodoHandler(inputValue, sortValue);
    setInputValue("");
  };
  return (
    <div>
      <FormComponent
        styles={styles}
        inputValue={inputValue}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        text="add"
      />
      <Sort sortValue={sortValue} setSortValue={setSortValue} />
    </div>
  );
};

export default TodoForm;
