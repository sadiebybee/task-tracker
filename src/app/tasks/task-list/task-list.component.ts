import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskListSub!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskListSub = this.taskService.taskListChangedEvent.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.filteredTasks = this.sortTasks(tasks);
      }
    );

    this.taskService.getTasks();
  }

  // Search and sort
  searchTasks(searchTerm: string) {
    if (!searchTerm) {
      this.filteredTasks = this.sortTasks(this.tasks);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(term) ||
        (t.description && t.description.toLowerCase().includes(term))
    );
    this.filteredTasks = this.sortTasks(filtered);
  }

  // Sort helper: incomplete first, then by due date
  sortTasks(tasks: Task[]): Task[] {
    return tasks.slice().sort((a, b) => {
      // Move completed tasks to bottom
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      // Compare due dates
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });
  }

  deleteTask(task: Task | null) {
    if (!task || !task._id) return;
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task);
    }
  }

  ngOnDestroy(): void {
    if (this.taskListSub) {
      this.taskListSub.unsubscribe();
    }
  }
}
