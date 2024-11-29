interface Notification {
    update(state: string): void
}

class TaskSubject {
    private notifications: Notification[] = []
    private state: string = ""

    attach(notification: Notification): void {
        this.notifications.push(notification)
    }

    detach(notification: Notification): void {
        this.notifications = this.notifications.filter((n) => n !== notification)
    }

    notify(): void {
        for (const notification of this.notifications) {
            notification.update(this.state)
        }
    }

    setState(state: string): void {
        this.state = state
        this.notify()
    }
}

class ConcretNotification implements Notification {
    update(state: string): void {
        console.log("notification task done", state);   
    }
}