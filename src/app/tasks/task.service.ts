import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.model';
import { MOCK_TASKS } from './MOCKTASKS';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks: Task[] = MOCK_TASKS;
  taskListChangedEvent = new Subject<Task[]>();
  taskSelectedEvent = new Subject<Task | null>();

  constructor() {}

  // GET all tasks
  getTasks() {
    // Simply emit current tasks for frontend-only mode
    this.taskListChangedEvent.next(this.tasks.slice());
  }

  // GET a single task by id
  getTask(id: string): Task | null {
    return this.tasks.find((t) => t.id === id) || null;
  }

  // ADD a new task
  addTask(newTask: Task) {
    if (!newTask) return;

    // Generate a unique ID
    const maxId = Math.max(
      0,
      ...this.tasks.map((t) => (t.id ? +t.id : 0))
    );
    newTask.id = (maxId + 1).toString();

    this.tasks.push(newTask);
    this.taskListChangedEvent.next(this.tasks.slice());
  }

  // UPDATE an existing task
  updateTask(originalTask: Task, newTask: Task) {
    if (!originalTask || !newTask) return;

    const pos = this.tasks.findIndex((t) => t.id === originalTask.id);
    if (pos < 0) return;

    newTask.id = originalTask.id;
    this.tasks[pos] = newTask;
    this.taskListChangedEvent.next(this.tasks.slice());
  }

  // DELETE a task
  deleteTask(task: Task | null) {
    if (!task) return;

    const pos = this.tasks.findIndex((t) => t.id === task.id);
    if (pos < 0) return;

    this.tasks.splice(pos, 1);
    this.taskListChangedEvent.next(this.tasks.slice());
  }
}
