import { Task } from './task.model';

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread',
    dueDate: '2025-12-20',
    completed: false
  },
  {
    id: '2',
    title: 'Finish project',
    description: 'Complete task tracker frontend',
    dueDate: '2025-12-25',
    completed: false
  },
  {
    id: '3',
    title: 'Workout',
    description: '1-hour run at the park',
    dueDate: '2025-12-18',
    completed: true
  },

  {
    id: '4',
    title: 'Holiday Prep',
    description: 'Decorate house, buy gifts, prepare dinner',
    dueDate: '2025-12-24',
    completed: false
  }
];
