import PropTypes from 'prop-types';
import { useState } from "react";
import { useTodo } from "../contexts";
import { BsPencil } from "react-icons/bs";
import { IoSaveOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const TodoItem = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const { toggleComplete, deleteTodo, updateTodo } = useTodo();
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const editedTodo = () => {
    updateTodo(todo.id, { todo: todoMsg }); // Ensure only the updated todo field is passed
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-violet-100" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer size-6 mt-1"
        checked={todo.completed}
        onChange={toggleCompleted}
        aria-label={`Mark ${todo.todo} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        aria-label={`Edit todo item ${todo.todo}`}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editedTodo(); // Save changes if editable
          } else {
            setIsTodoEditable((prev) => !prev); // Toggle edit mode
          }
        }}
        disabled={todo.completed}
        aria-label={isTodoEditable ? 'Save changes' : 'Edit todo'}
      >
        {isTodoEditable ? <IoSaveOutline style={{ fontSize: '16px' }} />: <BsPencil style={{ fontSize: '16px' }} />}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete ${todo.todo}`}
      >
        <MdDeleteOutline style={{ fontSize: '19px' }} />
      </button>
    </div>
  );
};

// PropTypes validation
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired
};

export default TodoItem;
