import { ITask } from "../patterns/TaskFactory"

function Task({ id, title, description, isDone }: ITask) {

  return (
    <div key={id} className={isDone ? "single-task task-done" : "single-task"}>
      <div style={{ width: "100%", textAlign: "left"}}>
        {title}
      </div>

      <div className="task-details">
        <div>
          {description}
        </div>
        { !isDone ?
          <div className="task-buttons">
            <button style={{ backgroundColor: "#23AC0D" }}>
              mark as done
            </button>
            <button style={{ backgroundColor: "#AC0D0D" }}>
              delete
            </button>
          </div>
          : 
          <div className="task-done-button">
            <button style={{ backgroundColor: "#FFC43D" }}>
              done
            </button>
          </div>
        }
      </div>

    </div>
  )

}

export default Task
