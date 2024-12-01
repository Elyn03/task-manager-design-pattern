import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Task from './components/Task'
import { SortStrategy, SortByAsc, SortByTasksDone, SortByDesc } from './patterns/SortStrategy'
// import { AddTask, TaskControl, TaskManager } from "./patterns/TaskManager"
import { ITask } from './patterns/TaskFactory'

function App() {

  
  let allTasks: ITask[] = [
    {
      id: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
      title: "Party Setup",
      description: "Decide who will buy what",
      isDone: false
    },
    {
      id: "8a6e0804-4672-b79d-2bd0-d97027f9071a",
      title: "Guest List",
      description: "Decide who to invite and confirm their attendance",
      isDone: true
    },
    {
      id: "8a6e0804-2bd0-4672-b79d-d97027f9071a",
      title: "Shopping List",
      description: "Buy raclette cheese, meats, drinks, potatoes",
      isDone: false
    }    
  ]

  const [allTasksSorted, setAllTasksSorted] = useState(allTasks)

  const addTask = (e: any) => {
    console.log(e);
  
    // const manager = new TaskManager(e)
    // const add = new AddTask(manager)
     
    // const control = new TaskControl(add)
    // control.setTask(add)
    // control.pressAdd()
  }

  const sort = (type: string) => {
    const context = new SortStrategy();

    switch (type) {
      case "all":
        setAllTasksSorted(allTasks)        
        break
      case "ascending":
        context.setStrategy(new SortByAsc(allTasks));
        const sortedAscTasks = context.executeStrategy(allTasks);
        setAllTasksSorted(sortedAscTasks)        
        break
      case "descending":
        context.setStrategy(new SortByDesc(allTasks));
        const sortedDescTasks = context.executeStrategy(allTasks);
        setAllTasksSorted(sortedDescTasks)        
        break
      case "done":
        context.setStrategy(new SortByTasksDone(allTasks));
        const doneTasks = context.executeStrategy(allTasks);
        setAllTasksSorted(doneTasks)
        break
      default:
        throw new Error("Invalid content type");
    }
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
        <div className="sort-container">
          <h3>Sort by</h3>
          <button onClick={() => sort("all")}>All</button>
          <button onClick={() => sort("ascending")}>Ascending</button>
          <button onClick={() => sort("descending")}>Descending</button>
          <button onClick={() => sort("done")}>Done</button>
        </div>
        <div className="tasks-list">
          {
            allTasksSorted.map((task) => {
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
