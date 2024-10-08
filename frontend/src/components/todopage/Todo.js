import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";
import { showErrorToast, showSuccesToast } from "../../utils/utils";

function Todo() {
  const [inputs, setInputs] = useState({ title: "", todo: "" });
  const [addTodos, setAddTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const maxTitleLength = 50; // Set your maximum length for title
  const maxDescriptionLength = 150; // Set your maximum length for description

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/todos");
      console.log("Fetched todos:", response.data);
      setAddTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      showErrorToast("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isValid = /^[a-zA-Z0-9 ]*$/.test(value);

    // Limit the length of the title

    if (isValid) {
      if (name === "title" && value.length > maxTitleLength) {
        showErrorToast(`Title length should not exceed ${maxTitleLength} characters.`);
        return;
      }

      // Limit the length of the description

      if (name === "todo" && value.length > maxDescriptionLength) {
        showErrorToast(`Description length should not exceed ${maxDescriptionLength} characters.`);
        return;
      }


    }

    if (isValid || name === "title") {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    } else {
      console.log("Invalid input, only letters and numbers are allowed.");
      showErrorToast("Invalid input, only letters and numbers are allowed.");
    }
  };

  const handleAddTodo = async () => {
    console.log("Adding Todo:", inputs.todo, inputs.title);

    if (!inputs?.todo.trim() || !inputs?.title.trim()) {
      showErrorToast("Please provide both the title and Description.");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        // Update the existing todo
        await axios.put(`http://localhost:3001/todos/${isEditing}`, {
          title: inputs.title,
          description: inputs.todo,
        });
        showSuccesToast("Todo updated successfully");
      } else {
        // Add a new todo
        await axios.post("http://localhost:3001/todos", {
          title: inputs.title,
          description: inputs.todo,
        });
        showSuccesToast("Todo added successfully");
      }

      // Fetch updated todos
      await fetchTodos();
      setInputs({ title: "", todo: "" }); // Clear inputs
    } catch (error) {
      console.error("Error adding/updating todo:", error);
      showErrorToast("Failed to add/update todo");
    } finally {
      setLoading(false);
      setIsEditing(false); // Reset editing state after adding/updating
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting todo with id:", id);

    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      showSuccesToast("Todo deleted successfully");
      // Fetch updated todos after deleting
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      showErrorToast("Failed to delete todo");
    }
  };

  const handleClicked = async (id, isCompleted) => {
    try {
      //through api
      const response = await axios.put(`http://localhost:3001/todos/${id}`, {
        completed: !isCompleted,
      });
      // showSuccesToast('Todo status updated successfully');
      // Fetch updated todos after updating status
      await fetchTodos();
    } catch (error) {
      showErrorToast("Error updating todo");
    }
  };

  const handleEdit = (id) => {
    const editValue = addTodos.find((val) => val._id === id);
    setInputs({ title: editValue.title, todo: editValue.description });
    setIsEditing(id);
  };

  return (
    <div className="main-container">
      <div className="heading-div">
        <h1>Todo-List</h1>
      </div>

      <div className="todo-input-field">
        <input
          type="text"
          name="title"
          placeholder="Title..."
          value={inputs.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="todo"
          placeholder="Description..."
          value={inputs.todo}
          onChange={handleChange}
        />
        <button className="addTodo" onClick={handleAddTodo} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Add Todo"
          )}
        </button>
      </div>

      <div className="listing-todo">
        {addTodos.length > 0 ? (
          addTodos.map((item) => (
            <div className="todo" key={item.id}>
              <h2 className="title">{item.title}</h2>
              <ul>
                <li className="description">{item.description}</li>
                <div className="icon">
                  <span onClick={() => handleClicked(item._id, item.completed)}>
                    {item.completed ? (
                      <img
                        src="green-tick.png"
                        height={"30px"}
                        width={"30px"}
                        alt="Complete"
                      />
                    ) : (
                      <img
                        src="tick.png"
                        height={"30px"}
                        width={"30px"}
                        alt="Complete"
                      />
                    )}
                  </span>
                  <span onClick={() => handleEdit(item._id)}>
                    <img
                      src="edit.png"
                      height={"30px"}
                      width={"30px"}
                      alt="Edit"
                    />
                  </span>
                  <span onClick={() => handleDelete(item._id)}>
                    <img
                      src="delete.png"
                      height={"30px"}
                      width={"30px"}
                      alt="Delete"
                    />
                  </span>
                </div>
              </ul>
            </div>
          ))
        ) : (
          <div className="noTodo">No Todos Found!!</div>
        )}
      </div>
    </div>
  );
}

export default Todo;
