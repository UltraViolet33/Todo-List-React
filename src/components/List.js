const List = ({removeTodo, todos, doTodo}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li>
          <i className={
            'far fa-2x ' + (todo.done ? 'fa-check-square' : 'fa-square')
          } onClick={()=>{doTodo(index)}}></i>
          <span>{todo.description}</span>
          <button onClick={()=>{removeTodo(index)}}>
            <i className="fas fa-trash fa-2x"></i>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
