import React from "react";

const TodoDetails = ({ todo, isEditing, onEditHandler, deleteTodo, onCompleteHandler}) => {
//   console.log(todo.text);

  return (
    <div>
      <div
        key={todo.id}
        className="flex justify-between w-[30%] md:text-center ml-[38em] my-[2em]"
      >
        <span onClick={()=>{onCompleteHandler(todo)}}>
        {todo.completed ? (
          <i className="fa-solid fa-circle-check"></i>
        ) : (
          <i className="fa-solid fa-stopwatch"></i>
        )}
        </span>
        <span className="ml-[5px]">{todo.text}</span>
        <div className="flex ">
          <button
            className="w-[5em] h-[2em] bg-[blue] rounded ml-[5em] text-white"
            onClick={() => onEditHandler(todo.id)}
            disabled={isEditing.edit}
          >
            Edit
          </button>
          <button
            className="w-[5em] h-[2em] bg-[red] rounded ml-[2em] text-white"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
