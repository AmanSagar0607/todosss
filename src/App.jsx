import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // Add state for filtering

  const addTodo = (todo) => {
    if (!todo.todo.trim()) {
      alert("Todo cannot be empty!"); // Validation for empty tasks
      return;
    }
    setTodos((prevTodos) => [
      { id: Date.now(), todo: todo.todo.toString(), completed: false, dueDate: todo.dueDate || null },
      ...prevTodos,
    ]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, todo: updatedTodo.todo.toString() }
          : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed)); // Clear completed tasks
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true; // Default "all"
  });

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#121212] min-h-screen py-8 rounded-xl">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2">
            Todosss
          </h1>

          {/* Todo Form */}
          <div className="mb-4">
            <TodoForm />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                filter === "all" ? "bg-violet-500" : "bg-gray-500"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "active" ? "bg-violet-500" : "bg-gray-500"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "completed" ? "bg-violet-500" : "bg-gray-500"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          {/* Clear Completed Button */}
          {todos.some((todo) => todo.completed) && (
            <div className="flex justify-center mb-4">
              <button
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            </div>
          )}

          {/* Todo List */}
          <div className="flex flex-wrap gap-y-3">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="w-full transition-all duration-300">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
