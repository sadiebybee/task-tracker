import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;

  constructor(
    private taskService: TaskService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route params
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.task = this.taskService.getTask(id);
    });
  }

  onEdit() {
    if (this.task) {
      this.router.navigate([this.task.id, 'edit'], { relativeTo: this.route.parent });
    }
  }

  onDelete() {
    if (this.task) {
      this.taskService.deleteTask(this.task);
      this.router.navigate(['/tasks']);
    }
  }
}
