import { SetStateAction } from "react";
import { ITask } from "./TaskFactory";
import { TaskSubject } from "./NotificationSystem";

interface Command {
  execute(): void;
}
export class TaskManager {
  setTasks: (action: SetStateAction<ITask[]>) => void;
  taskSubject: TaskSubject;

  constructor(
    setTasks: (action: SetStateAction<ITask[]>) => void,
    taskSubject: TaskSubject
  ) {
    this.setTasks = setTasks;
    this.taskSubject = taskSubject;
  }

  addTask = (item: ITask) => {
    const { title } = item;
    console.log(item);

    this.setTasks((prevTasks: ITask[]) => [...prevTasks, item]);
    this.taskSubject.setState(`Task added: ${title}`);
  };

  deleteTask = (item: ITask) => {
    const { title } = item;
    this.setTasks((prevTasks: ITask[]) =>
      prevTasks.filter(({ id }) => id !== item.id)
    );
    this.taskSubject.setState(`Task deleted: ${title}`);
  };

  markAsDone(item: ITask) {
    const { title } = item;
    this.setTasks((prevTasks: ITask[]) =>
      prevTasks.map(({ id, ...task }) =>
        id === item.id ? { id, ...task, isDone: true } : { id, ...task }
      )
    );
    this.taskSubject.setState(`Task mark as done: ${title}`);
  }
}

export class AddTask implements Command {
  private taskManager: TaskManager;
  private task: ITask;

  constructor(taskManager: TaskManager, task: ITask) {
    this.taskManager = taskManager;
    this.task = task;
  }

  execute(): void {
    this.taskManager.addTask(this.task);
  }
}

export class DeleteTask implements Command {
  private taskManager: TaskManager;
  private task: ITask;

  constructor(taskManager: TaskManager, task: ITask) {
    this.taskManager = taskManager;
    this.task = task;
  }

  execute(): void {
    this.taskManager.deleteTask(this.task);
  }
}

export class MarkAsDone implements Command {
  private taskManager: TaskManager;
  private task: ITask;

  constructor(taskManager: TaskManager, task: ITask) {
    this.taskManager = taskManager;
    this.task = task;
  }

  execute(): void {
    this.taskManager.markAsDone(this.task);
  }
}

// Invoker
export class TaskControl {
  private command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  setCommand(command: Command): void {
    this.command = command;
  }

  useCommand(): void {
    this.command.execute();
  }
}
