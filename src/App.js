import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";

function App() {
  // state for the todos
  const [todos, setTodos] = useState([]);

  // count the todos done
  const countTodosDone = (todos) => {
    const todoDone = todos.filter((todo) => todo.done);
    return todoDone.length;
  };

  // state for the counter
  const [counter, setCounter] = useState([
    { all: todos.length, done: countTodosDone(todos) },
  ]);

  // save to the local storage a todo
  const saveLocalStorage = () => {
    let todosJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todosJSON);
  };

  // get the todos from the local storage
  const getLocalStorage = () => {
    let todosJSON = localStorage.getItem("todos")
      ? localStorage.getItem("todos")
      : {};

    let todos = JSON.parse(todosJSON);
    // set the states
    setTodos(todos);
    const counterDone = countTodosDone(todos);
    setCounter([{ all: todos.length, done: counterDone }]);
  };

  // add a todo into the todo list and update the counter
  const addTodo = (todo) => {
    const tmpTodos = [...todos]; //on copie les todos
    tmpTodos.push({ done: false, description: todo }); //on ajoute un nouveau todo
    setTodos(tmpTodos);
    changeCounter("+", todos);
  };

  // remove a todo from the state and update the counter
  const removeTodo = (index) => {
    const tmpTodos = [...todos];
    tmpTodos.splice(index, 1);
    setTodos(tmpTodos);
    changeCounter("-", tmpTodos);
  };

  const changeCounter = (method, todos) => {
    let counterAll = counter[0].all;
    let counterDone;

    if (method === "+") {
      counterAll += 1;
      counterDone = countTodosDone(todos);
    } else {
      counterAll -= 1;
      counterDone = countTodosDone(todos);
    }
    setCounter([{ all: counterAll, done: counterDone }]);
  };

  const doTodo = (index) => {
    let counterDone;
    const tmpTodos = [...todos];

    tmpTodos[index].done = !tmpTodos[index].done;
    setTodos(tmpTodos);
    counterDone = countTodosDone(tmpTodos);
    setCounter([{ all: counter[0].all, done: counterDone }]);
  };

  // when the window loads
  useEffect(() => {
    getLocalStorage();
  }, []);

  // each time the state is updated
  useEffect(() => {
    saveLocalStorage();
  });

  return (
    <Fragment>
      <Header counter={counter[0]} />
      <main>
        <Form addTodo={addTodo} />
        <List removeTodo={removeTodo} todos={todos} doTodo={doTodo} />
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
