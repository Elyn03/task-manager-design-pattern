import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Task from "./components/Task";
import Notification from "./components/Notification";

import {
  SortStrategy,
  SortByAsc,
  SortByTasksDone,
  SortByDesc,
} from "./patterns/SortStrategy";

import { ITask } from "./patterns/TaskFactory";

import { TaskManager } from "./patterns/TaskManager";
import { ConcreteObserver, TaskSubject } from "./patterns/NotificationSystem";

const allTasks: ITask[] = [
  {
    id: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
    title: "Party Setup",
    description: "Decide who will buy what",
    isDone: false,
  },
  {
    id: "8a6e0804-4672-b79d-2bd0-d97027f9071b",
    title: "Guest List",
    description: "Decide who to invite and confirm their attendance",
    isDone: true,
  },
  {
    id: "8a6e0804-2bd0-4672-b79d-d97027f9071c",
    title: "Shopping List",
    description: "Buy raclette cheese, meats, drinks, potatoes",
    isDone: false,
  },
];

function App() {
  const [sorting, setSorting] = useState("all");
  const [sorted, setSorted] = useState(allTasks);
  const [tasks, setTasks] = useState(allTasks);
  const [notification, setNotification] = useState<string>("");
  const taskSubject = new TaskSubject(setNotification);

  const taskManager = new TaskManager(setTasks, taskSubject);

  const addObserver = new ConcreteObserver();
  const deleteObserver = new ConcreteObserver();
  const doneObserver = new ConcreteObserver();

  taskSubject.attach(addObserver);
  taskSubject.attach(deleteObserver);
  taskSubject.attach(doneObserver);

  useEffect(() => {
    sort(sorting);
  }, [tasks]);

  const sort = (type: string) => {
    const context = new SortStrategy();
    setSorting(type);

    switch (type) {
      case "all":
        setSorted(tasks);

        break;
      case "ascending":
        context.setStrategy(new SortByAsc(tasks));
        const sortedAscTasks = context.executeStrategy(tasks);
        setSorted(sortedAscTasks);
        break;
      case "descending":
        context.setStrategy(new SortByDesc(tasks));
        const sortedDescTasks = context.executeStrategy(tasks);
        setSorted(sortedDescTasks);

        break;
      case "done":
        context.setStrategy(new SortByTasksDone(tasks));
        const doneTasks = context.executeStrategy(tasks);

        setSorted(doneTasks);

        break;
      default:
        throw new Error("Invalid content type");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Create a task</h2>
        <Form taskManager={taskManager} />
      </div>
      <div className="tasks-container">
        <h2>All tasks</h2>
        <div className="sort-container">
          <h3>Sort by</h3>
          <button onClick={() => sort("all")}>All</button>
          <button onClick={() => sort("ascending")}>Ascending</button>
          <button onClick={() => sort("descending")}>Descending</button>
          <button onClick={() => sort("done")}>Done</button>
        </div>
        <div className="tasks-list">
          {sorted.map((task) => {
            return <Task key={task.id} {...task} taskManager={taskManager} />;
          })}
        </div>
      </div>
      <Notification message={notification} setMessage={setNotification} />
    </>
  );
}

export default App;
