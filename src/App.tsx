import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Task from './components/Task'
import { AddTask, TaskControl, TaskManager } from "./patterns/TaskManager"

function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Test",
      desc: "TestTestTestTest",
      done: false
    },
    {
      title: "Test",
      desc: "TestTestTestTest",
      done: false
    }
  ])

  const addTask = (e) => {
    console.log(e);
    
    // const manager = new TaskManager(e)
    // const add = new AddTask(manager)
     
    // const control = new TaskControl(add)
    // control.setTask(add)
    // control.pressAdd()
  }


  return (
    <>
      <div className="form-container">
        <h2>Create a task</h2>
        <Form 
          addTask={addTask}
        />
      </div>
      <div className="tasks-container">
        <h2>All tasks</h2>
        <div className="tasks-list">
          {
            tasks.map((task) => {
              return (
                <Task
                  title={task.title}
                  desc={task.desc}
                  done={task.done}
                  />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
