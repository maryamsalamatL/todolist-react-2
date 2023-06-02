import { useEffect, useRef } from "react";
import { useStatus } from "../components/provider/TodoProvider";
const FormComponent = ({
  styles,
  submitHandler,
  inputValue,
  changeHandler,
  text,
}) => {
  const inputRef = useRef();
  const status = useStatus();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form
      className={
        status === "home" ? styles.form : `${styles.form} ${styles.disabeld}`
      }
      onSubmit={submitHandler}
    >
      <input
        type="text"
        value={inputValue}
        className={styles.input}
        onChange={changeHandler}
        ref={inputRef}
      ></input>
      <button type="submit" className={styles.btn}>
        {text}
      </button>
    </form>
  );
};

export default FormComponent;
