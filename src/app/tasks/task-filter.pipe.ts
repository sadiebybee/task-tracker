import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], searchTerm: string): Task[] {
    if (!tasks || !searchTerm) {
      return tasks;
    }

    searchTerm = searchTerm.toLowerCase();

    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm)
    );
  }

}
