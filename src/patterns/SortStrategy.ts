import { ITask } from "./TaskFactory";

interface Strategy {
  execute(tasks: ITask[]): ITask[];
}

export class SortStrategy {
  private strategy: Strategy;

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  executeStrategy(tasks: ITask[]): ITask[] {
    return this.strategy.execute(tasks);
  }
}

export class SortByAsc {
  tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  execute(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class SortByDesc {
  tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  execute(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) => b.title.localeCompare(a.title));
  }
}

export class SortByTasksDone {
  tasks: ITask[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks;
  }

  execute(tasks: ITask[]): ITask[] {
    console.log("done");

    return tasks.filter((task: ITask) => task.isDone);
  }
}
