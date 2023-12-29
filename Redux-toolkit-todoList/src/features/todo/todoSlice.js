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
name : 'Todo',
//name is basically we use to identify the Slice, important it is 
initialState,
reducers:{
    // reducers contain Properties and Function 
    addTodo : (state,action)=>{},
    // (state,action) syntax which imply means that we will always have 
    removeTodo : ()=>{},
}

})