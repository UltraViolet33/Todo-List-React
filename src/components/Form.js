import { useState } from "react";

const Form = ({ addTodo }) => {
  const [todo, setTodo] = useState("");
  console.log(todo);

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button>Ajouter</button>
    </form>
  );
};

export default Form;
