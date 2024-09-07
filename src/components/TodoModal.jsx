import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root"); // To avoid accessibility warnings

const TodoModal = ({ isOpen, onRequestClose, todo, onSave }) => {
  const [editedTodo, setEditedTodo] = useState(todo);
  const [date] = useState(todo.dueDate || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the updated todo and due date
    onSave({ ...editedTodo, dueDate: date });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Todo"
      className="bg-black rounded-lg shadow-lg p-6" // Custom background color
      overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center"
      style={{
        content: {
          width: "500px",
          height: "400px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          padding: "1.5rem",
        },
      }}
    >
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold text-bg3 mb-4">Edit Todo</h2>{" "}
        {/* Custom text color */}
        <button onClick={onRequestClose}>
          <FaTimes size={24} className="text-bg3" /> {/* Custom icon color */}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-bg3 mb-2">Todo Text -</label>{" "}
        {/* Custom label color */}
        <textarea
          name="todo"
          value={editedTodo.todo}
          onChange={handleInputChange}
          rows="5"
          className="w-full px-3 py-2 rounded-lg  text-bg3 focus:outline-none resize-none"
        />
      </div>

      <div className="mb-4">
        <p className="text-bg4">
          Created At:{" "}
          {new Date(todo.id).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          (
          {new Date(todo.id).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
          )
        </p>
      </div>

      <div className="flex ">
        <button
          onClick={handleSave}
          className="px-4 py-2 hover:bg-btn1 rounded-lg bg-dark-btn text-bg3"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

// Add PropTypes validation
TodoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired, // Change this to `number`
    todo: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TodoModal;
