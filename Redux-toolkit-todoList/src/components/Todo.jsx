import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./AddTodo";
import { useState } from "react";
export default function Todo() {
  const dispatch = useDispatch(removeTodo(), updateTodo());
  const todos = useSelector((state) => state.todos);
  const [updatedText, setUpdatedtext] = useState("");

  const handleUpdateClick = (todo) => {
    // Use prompt to get user input for the updated text
    const updatedText = prompt("Enter updated text:", todo.textValue);

    // Check if the user provided input (not canceled)
    if (updatedText !== null) {
      // Dispatch the updateTodo action with the updated text
      dispatch(updateTodo({ id: todo.id, newText: updatedText }));
      toast.success("Updated Value Successfully ");
    }
  };

  return (
    <div className="h-screen bg-gray-200 w-full flex justify-center items-center flex-col ">
       <h1 className="text-center font-bold">Todo App </h1>
      <AddTodo />
      <ToastContainer />
      <ul className="list-none w-8/12 ml-auto text-center">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-blue-800 px-4 py-2 rounded w-6/12"
            key={todo.id}
          >
            <div className="text-white">{todo.textValue}</div>
            <div className="text-white">{todo.date}</div>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>{" "}
            <button
              onClick={() => handleUpdateClick(todo, updatedText)}
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
