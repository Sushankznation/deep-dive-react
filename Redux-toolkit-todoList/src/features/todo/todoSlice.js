import { createSlice, nanoid } from "@reduxjs/toolkit";
// CreateSlice basically we use when we want to create a new SLice
// nanoid just helps us to create new  and uniques id
const initialState = {
  todos: [
    {
      id: 1,
      textValue: "Hello World",
    },
  ],
};
// initialState its basically the default state of the app
export const TodoSlice = createSlice({
  //It always store Object
  name: "Todo",
  //name is basically we use to identify the Slice, important it is
  initialState,
  reducers: {
    // reducers contain Properties and Function
    addTodo: (state, action) => {
      const newText = action.payload.trim(); // Remove leading and trailing spaces
    
      if (newText !== "") {
        const todo = {
          id: nanoid(),
          text: newText,
        };
        state.todos.push(todo);
        alert("Added Successfully")
      } else {
        alert("Cannot add an empty todo");
      }
    },
    
    // (state,action)
    //state : holds the current state
    //  action : tells where we need to impact that action like keys detector for add todo, delete etc.
    // action.payload like
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    updateTodo: (state, action) => {
      // destructure
      const { id, newText } = action.payload;
      state.todos = state.todos.map((e) =>
        e.id === id ? { ...e, text: newText } : e
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = TodoSlice.actions;
export default TodoSlice.reducer;