import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },

  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskEditComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: 'tasks/edit/:id', component: TaskEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
