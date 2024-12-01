import { useState } from "react";

import { AddTask, TaskControl, TaskManager } from "../patterns/TaskManager";

import { TaskFactory } from "../patterns/TaskFactory";

const DEFAULT = { title: "", description: "" };

function Form({ taskManager }: { taskManager: TaskManager }) {
  const [form, setForm] = useState(DEFAULT);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const submitNewTask = (e: any) => {
    e.preventDefault();

    if (form.title && form.description) {
      const { title, description } = form;
      const task = TaskFactory.createTask(title, description);
      const addTask = new AddTask(taskManager, task);
      const control = new TaskControl(addTask);
      control.setCommand(addTask);
      control.useCommand();

      // Reset the form after submission
      setForm(DEFAULT);
    } else {
      console.log("Please fill out both the title and description.");
    }
  };

  return (
    <div className="form-task">
      <form onSubmit={submitNewTask}>
        <div className="form-label">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-label">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter task description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Form;
