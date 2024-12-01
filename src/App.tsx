import './App.css'
import Form from './components/Form'
import Task from './components/Task'
import { SortStategy, SortByAsc, SortByTasksDone } from './patterns/SortStrategy'
// import { AddTask, TaskControl, TaskManager } from "./patterns/TaskManager"
import { ITask } from './patterns/TaskFactory'

function App() {

  let allTasks: ITask[] = [
    {
      id: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
      title: "Courses",
      description: "Acheter des patates et du fromage raclette",
      isDone: false
    },
    {
      id: "8a6e0804-4672-b79d-2bd0-d97027f9071a",
      title: "Messages",
      description: "Inviter des amis pour une raclette party",
      isDone: true
    }
  ]

  const addTask = (e: any) => {
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
            allTasks.map((task) => {
              return (
                <Task
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isDone={task.isDone}
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
