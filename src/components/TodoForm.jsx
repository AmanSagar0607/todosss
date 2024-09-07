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
    <form
      onSubmit={add}
      className="flex w-[280px] sm:w-[400px] xs:w-[300px] mx-auto"
    >
      <input
        type="text"
        placeholder="Write Todosss..."
        className="border border-dark-btn rounded-l-lg px-4 outline-none duration-150  py-3 w-full"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-dark-btn hover:bg-bg1 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
