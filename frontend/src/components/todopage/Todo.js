import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [inputs, setInputs] = useState({ title: "", todo: "" }); // Use an object to store both inputs
  const [addTodos, setAddTodos] = useState([]); // State for added todos

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from the event target
    const isValid = /^[a-zA-Z0-9]*$/.test(value); // Check validity

    if (isValid || name === "title") { // Allow title to have more characters
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value })); // Update state for the specific input
    } else {
      console.log("Invalid input, only letters and numbers are allowed.");
    }
  };

  const handleAddTodo = () => {
    if (inputs.todo) {
      setAddTodos([...addTodos, { id: Date.now(), title: inputs.title, text: inputs.todo }]);
      setInputs({ title: "", todo: "" }); // Clear input fields after adding
    }
  };

  const handleDelete = (id) => {
    const filteredData = addTodos.filter((value) => value.id !== id);
    setAddTodos(filteredData);
  };

  return (
    <div className="main-container">
      <div className="heading-div">
        <h1>Todo-List</h1>
      </div>

      <div className="todo-input-field">
        <input
          type="text"
          name="title" // Use name attribute to identify the input
          placeholder="Title"
          value={inputs.title} // Bind to the title state
          onChange={handleChange}
        />
        <input
          type="text"
          name="todo" // Use name attribute to identify the input
          placeholder="Enter a Todo..."
          value={inputs.todo} // Bind to the todo state
          onChange={handleChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="listing-todo">
        {addTodos.map((item) => (
          <div className="todo" key={item.id}>
            <h1>{item.title}</h1>
            <ul>
              <li>{item.text}</li>
              <div className="icon">
                <span>
                  <img src="tick.png" height={"30px"} width={"30px"} alt="Complete" />
                </span>
                <span>
                  <img src="edit.png" height={"30px"} width={"30px"} alt="Edit" />
                </span>
                <span onClick={() => handleDelete(item.id)}>
                  <img src="delete.png" height={"30px"} width={"30px"} alt="Delete" />
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
