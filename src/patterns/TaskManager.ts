interface Task {
    execute(): void;
}

export class TaskManager {
    title: string
    description: string
    done: boolean

    constructor(task: any) {
        this.title = task.title
        this.description = task.description
        this.done = task.done
    }

    addTask() {
        console.log("hehehe");
        // setTasks((prevTask) => ([ ...prevTask, e ]))
    }

    deleteTask() {
        console.log("delete");
    }

    markAsDone() {
        console.log("mark as done");
    }
}

export class AddTask implements Task {
    private taskManager: TaskManager;

    constructor(taskManager: TaskManager) {
        this.taskManager = taskManager
    }

    execute(): void {
        this.taskManager.addTask();
    }

}

export class DeleteTask implements Task {
    private taskManager: TaskManager;

    constructor(taskManager: TaskManager) {
        this.taskManager = taskManager
    }

    execute(): void {
        this.taskManager.deleteTask();
    }

}

export class MarkAsDone implements Task {
    private taskManager: TaskManager;

    constructor(taskManager: TaskManager) {
        this.taskManager = taskManager
    }

    execute(): void {
        this.taskManager.markAsDone();
    }
}

// Invoker
export class TaskControl {
    private task: Task;

    constructor(task: Task) {
        this.task = task
    }

    setTask(task: Task): void {
        this.task = task
    }

    pressAdd(): void {
        this.task.execute()
    }
}