import logo from "./logo.svg";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";

/**
 * App
 */
function App() {
  const [todos, setTodos] = useState([
    // { done: false, description: "Trouver un job" },
    // { done: true, description: "Apprendre React.JS" },
    // { done: true, description: "Découvrir Formacitron" },
    // { done: true, description: "Coder en React" },
  ]);

  const saveLocalStorage = () => {

    let todosJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todosJSON);
  };

  const getLocalStorage = () => {

    let todosJSON = localStorage.getItem('todos') ? localStorage.getItem('todos') : null;
    let todos = JSON.parse(todosJSON);
    console.log(todos);

    const tmpTodos = todos;
    setTodos(todos);
  }



  /**
   * Count the todos done
   * @returns
   */
  const countTodosDone = (todos) => {
    const todoDone = todos.filter((todo) => todo.done);
    //console.log(todoDone.length);
    return todoDone.length;
  };

  const [counter, setCounter] = useState([
    { all: todos.length, done: countTodosDone(todos) },
  ]);

  //saveLocalStorage();
  //getLocalStorage();

  //console.log(counter);

  const addTodo = (todo) => {
    const tmpTodos = [...todos]; //on copie les todos
    tmpTodos.push({ done: false, description: todo }); //on ajoute un nouveau todo
    setTodos(tmpTodos);
    //console.log(counter);
    changeCounter("+");
    saveLocalStorage();
  };

  const removeTodo = (index) => {
    const tmpTodos = [...todos];
    tmpTodos.splice(index, 1);
    setTodos(tmpTodos);
    changeCounter("-", tmpTodos);
    //saveLocalStorage();
  };

  const changeCounter = (method, todos2) => {
    let counterAll = counter[0].all;
    //console.log(countTodosDone());
    let counterDone;
    // method === "+" ? (counterAll += 1) : (counterAll -= 1);
    if (method === "+") {
      counterAll += 1;
      counterDone = countTodosDone(todos);
      //console.log(counterDone);
    } else {
      counterAll -= 1;
      counterDone = countTodosDone(todos2);
      // console.log(counterDone);
      // console.log(countTodosDone(todos));
    }
    setCounter([{ all: counterAll, done: counterDone }]);
  };

  const doTodo = (index) => {
    const tmpTodos = [...todos];
    tmpTodos[index].done = !tmpTodos[index].done;
    setTodos(tmpTodos);
    //console.log(todos);
    let counterDone;
    counterDone = countTodosDone(tmpTodos);
    setCounter([{ all: counter[0].all, done: counterDone }]);
    //saveLocalStorage();
  };


  useEffect(()=>{
    getLocalStorage()

  }, [])
  useEffect(()=>{
    saveLocalStorage();
  })


 

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
