import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit{
  private taskService: TaskService;
  private sub: Subscription | null = null;
  taskList: Task[];

  ngOnInit() {
    this.sub = this.taskService.tasks$.subscribe(updatedTasks => {
      this.taskList = updatedTasks;
    });
  }

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  completeTask(task: Task) {
    this.taskService.addDoneTask(task);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
  }
}
