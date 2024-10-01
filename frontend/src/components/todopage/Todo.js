import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [inputs, setInputs] = useState({ title: "", todo: "" });
  const [addTodos, setAddTodos] = useState([]);
  const [clickedStates, setClickedStates] = useState({});
  const [isEditing, setIsEditing] = useState(false); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isValid = /^[a-zA-Z0-9 ]*$/.test(value); 

    if (isValid || name === "title") {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    } else {
      console.log("Invalid input, only letters and numbers are allowed.");
    }
  };

  const handleAddTodo = () => {
    if (inputs.todo && inputs.title) {
      if (isEditing) {
        setAddTodos((prev) =>
          prev.map((item) =>
            item.id === isEditing
              ? { ...item, title: inputs.title, text: inputs.todo }
              : item
          )
        );
        setIsEditing(null);
      } else {
        // Add new todo
        setAddTodos((prev) => [
          ...prev,
          { id: Date.now(), title: inputs.title, text: inputs.todo },
        ]);
      }
      setInputs({ title: "", todo: "" }); 
    }
  };

  const handleDelete = (id) => {
    const filteredData = addTodos.filter((value) => value.id !== id);
    setAddTodos(filteredData);
    setClickedStates((prev) => {
      const newStates = { ...prev };
      delete newStates[id]; 
      return newStates;
    });
    setInputs({ title: "", todo: "" });
    setIsEditing(false);
  };

  const handleClicked = (id) => {
    setClickedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEdit = (id) => {
    const editValue = addTodos.find((val) => val.id === id);
    setInputs({ title: editValue.title, todo: editValue.text }); 
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
        <button onClick={handleAddTodo}>{isEditing ? "Edit" : "Add"}</button>
      </div>

      <div className="listing-todo">
        {addTodos.map((item, index) => (
          <div className="todo" key={item.id}>
            <h3>Task: {index + 1}</h3>
            <h2>Title: {item.title}</h2>
            <ul>
              <li>Description: {item.text}</li>
              <div className="icon">
                <span onClick={() => handleClicked(item.id)}>
                  {clickedStates[item.id] ? (
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
                <span onClick={() => handleEdit(item.id)}>
                  <img
                    src="edit.png"
                    height={"30px"}
                    width={"30px"}
                    alt="Edit"
                  />
                </span>
                <span onClick={() => handleDelete(item.id)}>
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
        ))}
      </div>
    </div>
  );
}

export default Todo;
