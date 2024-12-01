import { SetStateAction } from "react";

interface Observer {
  update(state: string): void;
}

export class TaskSubject {
  private observers: Observer[] = [];
  private state: string = "";
  setNotification: (action: SetStateAction<string>) => void;

  constructor(setNotification: (action: SetStateAction<string>) => void) {
    this.setNotification = setNotification;
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((n) => n !== observer);
  }

  notify(): void {
    for (const notification of this.observers) {
      notification.update(this.state);
    }
  }

  setState(state: string): void {
    this.setNotification(state);
    this.state = state;
    this.notify();
  }
}

export class ConcreteObserver implements Observer {
  update(state: string): void {
    console.log("notification task done", state);
  }
}
