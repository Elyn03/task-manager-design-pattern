import {
  DeleteTask,
  MarkAsDone,
  TaskControl,
  TaskManager,
} from "../patterns/TaskManager";

interface CTask {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  taskManager: TaskManager;
}

function Task({ taskManager, ...task }: CTask) {
  const { id, title, description, isDone } = task;

  const removeTask = () => {
    console.log("delete");
    const removeTask = new DeleteTask(taskManager, task);
    const control = new TaskControl(removeTask);
    control.setCommand(removeTask);
    control.useCommand();
  };

  const markAsDone = () => {
    console.log("done");
    const markAsDone = new MarkAsDone(taskManager, task);
    const control = new TaskControl(markAsDone);
    control.setCommand(markAsDone);
    control.useCommand();
  };

  return (
    <div key={id} className={isDone ? "single-task task-done" : "single-task"}>
      <div style={{ width: "100%", textAlign: "left" }}>{title}</div>

      <div className="task-details">
        <div>{description}</div>
        {!isDone ? (
          <div className="task-buttons">
            <button style={{ backgroundColor: "#23AC0D" }} onClick={markAsDone}>
              mark as done
            </button>
            <button style={{ backgroundColor: "#AC0D0D" }} onClick={removeTask}>
              delete
            </button>
          </div>
        ) : (
          <div className="task-done-button">
            <button style={{ backgroundColor: "#FFC43D" }}>done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
