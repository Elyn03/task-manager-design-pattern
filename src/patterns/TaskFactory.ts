import { v4 as uuidv4 } from "uuid";

export interface ITask {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export class TaskFactory {
  static createTask(title: string, description: string): ITask {
    return {
      id: uuidv4(),
      title: title,
      description: description,
      isDone: false,
    };
  }
}
