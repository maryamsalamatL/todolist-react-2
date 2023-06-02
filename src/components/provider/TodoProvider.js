import React, { useState, useContext } from "react";
import _ from "lodash";

const TodoContext = React.createContext();
const TodoContextDispatcher = React.createContext();
const AllTodosContext = React.createContext();
const AllTodosContextDispatcher = React.createContext();
const StatusContext = React.createContext();
const StatusContextDispatcher = React.createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [status, setStatus] = useState("home");

  return (
    <TodoContext.Provider value={todos}>
      <TodoContextDispatcher.Provider value={setTodos}>
        <AllTodosContext.Provider value={allTodos}>
          <AllTodosContextDispatcher.Provider value={setAllTodos}>
            <StatusContext.Provider value={status}>
              <StatusContextDispatcher.Provider value={setStatus}>
                {children}
              </StatusContextDispatcher.Provider>
            </StatusContext.Provider>
          </AllTodosContextDispatcher.Provider>
        </AllTodosContext.Provider>
      </TodoContextDispatcher.Provider>
    </TodoContext.Provider>
  );
};

export default TodoProvider;
export const useTodos = () => useContext(TodoContext);
export const useAllTodos = () => useContext(AllTodosContext);
export const useStatus = () => useContext(StatusContext);
export const useStatusActions = () => useContext(StatusContextDispatcher);

export const useTodosActions = () => {
  const todos = useContext(TodoContext);
  const setTodos = useContext(TodoContextDispatcher);
  const allTodos = useContext(AllTodosContext);
  const setAllTodos = useContext(AllTodosContextDispatcher);
  const status = useStatus();
  const setStatus = useStatusActions();

  const addTodoHandler = (inputValue, sortValue) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      isCompleted: false,
      isImportant: false,
      text: inputValue,
      date: new Date().toISOString(),
    };

    const sortedAllTodos =
      sortValue === "newest"
        ? _.orderBy([...allTodos, newTodo], ["date"], ["desc"])
        : _.orderBy([...allTodos, newTodo], ["date"], ["asc"]);
    const sortedTodos =
      sortValue === "newest"
        ? _.orderBy([...todos, newTodo], ["date"], ["desc"])
        : _.orderBy([...todos, newTodo], ["date"], ["asc"]);
    setAllTodos(sortedAllTodos);
    setTodos(sortedTodos);
  };
  const completeHandler = (id) => {
    const index = todos.findIndex((t) => t.id === id);
    const todo = { ...todos[index] };
    todo.isCompleted = !todo.isCompleted;
    const updatedTodos = [...todos];
    updatedTodos[index] = todo;

    const index2 = allTodos.findIndex((t) => t.id === id);
    const todo2 = { ...allTodos[index2] };
    todo2.isCompleted = !todo2.isCompleted;
    const updatedAllTodos = [...allTodos];
    updatedAllTodos[index2] = todo2;
    setAllTodos(updatedAllTodos);
    setTodos(updatedTodos);
  };
  const removeHandler = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id != id);
    const filteredAllTodos = allTodos.filter((todo) => todo.id != id);
    setAllTodos(filteredAllTodos);
    setTodos(filteredTodos);
  };
  const editHandler = (id, inputValue) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const todo = { ...todos[index] };
    todo.text = inputValue;
    const updatedTodos = [...todos];
    updatedTodos[index] = todo;

    const index2 = allTodos.findIndex((todo) => todo.id === id);
    const todo2 = { ...allTodos[index2] };
    todo2.text = inputValue;
    const updatedAllTodos = [...allTodos];
    updatedAllTodos[index2] = todo2;
    setAllTodos(updatedAllTodos);
    setTodos(updatedTodos);
  };
  const importantHandler = (id) => {
    const index = todos.findIndex((t) => t.id === id);
    const todo = { ...todos[index] };
    todo.isImportant = !todo.isImportant;
    const updatedTodos = [...todos];

    const index2 = allTodos.findIndex((t) => t.id === id);
    const todo2 = { ...todos[index2] };
    todo2.isImportant = !todo2.isImportant;
    const updatedAllTodos = [...allTodos];
    updatedAllTodos[index2] = todo2;
    updatedTodos[index] = todo;

    setAllTodos(updatedAllTodos);
    setTodos(updatedTodos);
  };
  const filterHandler = (status) => {
    if (status === "home") {
      setTodos(allTodos);
      return allTodos;
    } else if (status === "all") {
      setTodos(allTodos);
      return allTodos;
    } else if (status === "important") {
      const filteredTodos = allTodos.filter((todo) => todo.isImportant);
      setTodos(filteredTodos);
      return filteredTodos;
    } else if (status === "completed") {
      const filteredTodos = allTodos.filter((todo) => todo.isCompleted);
      setTodos(filteredTodos);
      return filteredTodos;
    } else if (status === "unCompleted") {
      const filteredTodos = allTodos.filter((todo) => !todo.isCompleted);
      setTodos(filteredTodos);
      return filteredTodos;
    }
  };
  const searchHandler = (e) => {
    const filteredTodos = filterHandler(status);
    const value = e.target.value;
    const updatedTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(value.toLowerCase())
    );
    setTodos(updatedTodos);
  };
  const sortHandler = (value) => {
    const filteredTodos = filterHandler(status);
    if (value === "oldest") {
      setTodos(_.orderBy(filteredTodos, ["date"], ["asc"]));
    } else if (value === "newest") {
      setTodos(_.orderBy(filteredTodos, ["date"], ["desc"]));
    }
  };
  return {
    editHandler,
    removeHandler,
    completeHandler,
    addTodoHandler,
    importantHandler,
    filterHandler,
    searchHandler,
    sortHandler,
  };
};
