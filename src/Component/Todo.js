import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoDetails from "./TodoDetails";

function Todo() {
const ALL= "ALL";
const PENDING= "PENDING";
const COMPLETED= "COMPLETED";

  const [input, setInput] = useState("");
  const [todoArr, setTodoArr] = useState([]);
  const [isEditing, setIsEditing] = useState({ edit: false, todoId: "" });
  const[filter, setFilter]=useState(ALL)

  const onAddTodo = () => {
    if (!input) return;

    const newTodo = {
      id: uuidv4().split("-")[0],
      text: input,
      completed: false,
    };

    setTodoArr([...todoArr, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    const delTodo = todoArr.filter((todo) => todo.id != id);
    setTodoArr(delTodo);
  };

  const onEditHandler = (id) => {
    setIsEditing({ edit: true, todoId: id });
    const todo = todoArr.find((todo) => todo.id == id);
    // console.log(todo)
    setInput(todo.text);
  };

  const onUpdateHandler = () => {
    // console.log(isEditing.todoId)
    const currId = isEditing.todoId;
    const todoIndex = todoArr.findIndex((elem) => elem.id === currId);
    const cloneArr = [...todoArr];
    cloneArr[todoIndex] = { id: currId, text: input };
    setInput("");
    setTodoArr(cloneArr);
    setIsEditing({ edit: false, todoId: "" });
  };

  const onCompleteHandler = (todo) => {

    const todoIndex = todoArr.findIndex((elem) => elem.id === todo.id);
    const cloneArr = [...todoArr];
    cloneArr[todoIndex] = {  text: todo.text, completed: !todo.completed };
    setTodoArr(cloneArr);
  };

  return (
    <>
      <div className="container text-center">
        <h1 className="text-[50px]">Todo App</h1>
        <div className="flex my-[30px] ml-[38%]">
          <input
            type="text"
            className="w-[400px] rounded"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></input>

          {isEditing.edit ? (
            <button
              className="w-[5em] h-[2em] text-black rounded-md bg-[yellow] mx-[20px]"
              onClick={onUpdateHandler}
            >
              Update
            </button>
          ) : (
            <button
              className="w-[5em] h-[2em] text-white rounded-md bg-[green] mx-[20px]"
              onClick={onAddTodo}
            >
              Add
            </button>
          )}
        </div>

        <div className="flex justify-between w-[60%] ml-[35%]">
            <button className={`${filter===ALL?"w-[5em] h-[2em] text-white rounded-md bg-[skyblue] mx-[20px]":""}"w-[5em] h-[2em] text-white rounded-md mx-[20px]":`} onClick={()=>{setFilter(ALL)}}>All</button>
            <button  className={`${filter===PENDING?"w-[5em] h-[2em] text-white rounded-md bg-[skyblue] mx-[20px]":""}"w-[5em] h-[2em] text-white rounded-md mx-[20px]":`} onClick={()=>{setFilter(PENDING)}}>Pending</button>
            <button  className={`${filter===COMPLETED?"w-[5em] h-[2em] text-white rounded-md bg-[skyblue] mx-[20px]":""}"w-[5em] h-[2em] text-white rounded-md mx-[20px]":`} onClick={()=>{setFilter(COMPLETED)}}>Completed</button>
        </div>

        <div>
          {
          todoArr.length > 0 && filter===ALL &&
            todoArr.map((todo) => (
              <TodoDetails
                key={todo.id}
                todo={todo}
                onEditHandler={onEditHandler}
                onCompleteHandler={onCompleteHandler}
                onDeleteTodo={deleteTodo}
                isEditing={isEditing}
              />
            ))}
          {
          todoArr.length > 0 && filter===PENDING &&
            todoArr.map((todo) => (
                !todo.completed &&
              <TodoDetails
                key={todo.id}
                todo={todo}
                onEditHandler={onEditHandler}
                onCompleteHandler={onCompleteHandler}
                onDeleteTodo={deleteTodo}
                isEditing={isEditing}
              />
            ))}
          {
          todoArr.length > 0 && filter===COMPLETED &&
            todoArr.map((todo) => (
                todo.completed &&
              <TodoDetails
                key={todo.id}
                todo={todo}
                onEditHandler={onEditHandler}
                onCompleteHandler={onCompleteHandler}
                onDeleteTodo={deleteTodo}
                isEditing={isEditing}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Todo;
