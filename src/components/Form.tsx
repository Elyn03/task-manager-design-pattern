import { useState } from "react";

function Form({ addTask }) {
  const [form, setForm] = useState({ title: "", desc: "", done: false });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const submitNewTask = (e: any) => {
    e.preventDefault();

    if (form.title && form.desc) {
      addTask({
        title: form.title,
        desc: form.desc,
        done: false,
      });

      // Reset the form after submission
      setForm({ title: "", desc: "", done: false });
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
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="Enter task description"
            value={form.desc}
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
