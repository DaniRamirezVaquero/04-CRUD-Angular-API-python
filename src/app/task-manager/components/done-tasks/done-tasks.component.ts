import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.css']
})
export class DoneTasksComponent implements OnInit{
  private taskService: TaskService;
  private sub: Subscription | null = null;
  doneTasksList: Task[];

  ngOnInit() {
    this.sub = this.taskService.doneTasks$.subscribe(updatedDoneTasks => {
      this.doneTasksList = updatedDoneTasks;
    });
  }

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  recoverDoneTask(task: Task) {
    this.taskService.recoverDoneTask(task);
  }

  deleteDoneTask(id: number) {
    this.taskService.deleteDoneTask(id);
  }
}
