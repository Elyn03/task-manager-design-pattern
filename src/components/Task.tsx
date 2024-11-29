import { useState } from 'react'

function Task({ title, desc, done }) {

  return (
    <div key={title} className="single-task">
      <div style={{ width: "100%", textAlign: "left"}}>
        {title}
      </div>

      <div className="task-details">
        <div>
          {desc}
        </div>
        <div className="task-buttons">
          <button style={{ borderRadius: 100, backgroundColor: "#23AC0D" }}>
            Mark as done
          </button>
          <button style={{ borderRadius: 100, backgroundColor: "#AC0D0D" }}>
            delete
          </button>
        </div>
      </div>

    </div>
  )

}

export default Task
