import { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo(); // Access the addTodo function from the context

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    // Call the addTodo function with the new todo item
    addTodo({ todo, completed: false });

    // Clear the input field after adding the todo
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todosss..."
        className="w-full border border-black/10 rounded-l-lg px-4 outline-none duration-150 bg-white/20 py-3"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-violet-500 hover:bg-violet-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
