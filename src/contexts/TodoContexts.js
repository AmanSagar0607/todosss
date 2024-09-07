// src/contexts/TodoContext.js
import { createContext, useContext } from "react";

// Create the context with a default value
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "Todo Message",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

// Custom hook to use the TodoContext
export const useTodo = () => {
  return useContext(TodoContext);
};

// Provider component to wrap your app and provide the context
export const TodoProvider = TodoContext.Provider;
