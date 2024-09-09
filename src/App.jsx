import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import social icons
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    if (!todo.todo.trim()) {
      alert("Todo cannot be empty!");
      return;
    }
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        todo: todo.todo.toString(),
        completed: false,
        dueDate: todo.dueDate || null,
      },
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
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
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

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const allCompleted = remainingCount === 0 && todos.length > 0;

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="flex flex-col min-h-screen bg-main-bg text-btn3">
        {/* Header Section for Mobile */}
        <header className="p-4 bg-dark-bg text-center rounded-t-xl sm:hidden">
          <h1 className="text-3xl font-bold  mb-6 mt-4">Todosss</h1>
          <TodoForm />
          <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
            <button
              className={`px-3 py-1 rounded ${
                filter === "all"
                  ? "bg-bg1 hover:bg-bg1"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded ${
                filter === "active"
                  ? "bg-btn1 hover:bg-dark-btn"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 rounded ${
                filter === "completed"
                  ? "bg-btn1 hover:bg-dark-btn"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            {todos.some((todo) => todo.completed) && (
              <button
                className="px-3 py-1 bg-btn1 rounded hover:bg-dark-btn"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            )}
          </div>
        </header>

        {/* Header Section for Large Screens */}
        <header className="hidden sm:flex flex-col items-center rounded-t-xl p-4  text-center">
          <h1 className=" text-4xl font-bold mb-8 mt-8">Todosss</h1>
          <TodoForm />
          <div className="flex gap-4 mt-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                filter === "all"
                  ? "bg-btn1 hover:bg-dark-btn"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "active"
                  ? "bg-btn1 hover:bg-dark-btn"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded ${
                filter === "completed"
                  ? "bg-btn1 hover:bg-dark-btn"
                  : "bg-btn2 hover:bg-dark-btn"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            {todos.some((todo) => todo.completed) && (
              <button
                className="px-4 py-2 bg-btn1 rounded hover:bg-dark-btn"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            )}
          </div>
        </header>

        {/* Todo List Section */}
        <main className="flex-grow p-4">
          <div className="w-full max-w-lg mx-auto bg-dark-bg p-6 rounded-lg shadow-lg">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-btn3">No to-dos available</p>
            ) : (
              <div className="space-y-4">
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} />
                ))}
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="w-full max-w-lg mx-auto bg-dark-bg p-6 rounded-lg mt-6 shadow-lg">
            {allCompleted ? (
              <p className="text-center text-btn3">All todos are complete!</p>
            ) : (
              <p className="text-center text-btn3">
                {remainingCount} {remainingCount === 1 ? "todo" : "todos"} remaining
              </p>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className=" text-btn3 py-4">
          <div className="flex justify-center items-center gap-2 space-x-6">
            <a
              href="https://github.com/AmanSagar0607/todosss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/amansagar0607"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com/AmanSagar0607"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
          </div>
          <p className="text-center text-sm mt-4">
            © 2024 Todosss - Made with 💛 by{" "}
            <a
              href="https://bento.me/amansagar"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-btn1"
            >
              Aman Sagar
            </a>
          </p>
        </footer>
      </div>
    </TodoProvider>
  );
}

export default App;
