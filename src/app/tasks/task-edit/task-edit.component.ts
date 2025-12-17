import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  originalTask: Task | null = null;
  task: Task = new Task('', '', '', '', false);
  editMode: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        // Adding a new task
        this.editMode = false;
        this.task = new Task('', '', '', '', false);
        return;
      }

      // Editing an existing task
      this.originalTask = this.taskService.getTask(id);
      if (!this.originalTask) return;

      this.editMode = true;
      this.task = JSON.parse(JSON.stringify(this.originalTask));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newTask = new Task(
      '',
      value.title,
      value.description || '',
      value.dueDate || '',
      value.completed || false
    );

    if (this.editMode) {
      this.taskService.updateTask(this.originalTask!, newTask);
    } else {
      this.taskService.addTask(newTask);
    }

    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
