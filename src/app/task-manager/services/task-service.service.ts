import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  private doneTasks = new BehaviorSubject<Task[]>([]);
  private updatingTask = new BehaviorSubject<Task>({ name: '', date: '', id: 0 });

  tasks$ = this.tasks.asObservable();
  doneTasks$ = this.doneTasks.asObservable();

  constructor(private apiService: ApiService) {
    this.loadTasks();
    this.loadDoneTasks();
  }

  loadTasks() {
    this.apiService.loadTasks().pipe(
      tap((tasks: Task[]) => {
        this.tasks.next(tasks);
      })
    ).subscribe();
  }

  loadDoneTasks() {
    this.apiService.loadDoneTasks().pipe(
      tap((doneTasks: Task[]) => {
        this.doneTasks.next(doneTasks);
      })
    ).subscribe();
  }

  // add-task.component.ts
  addTask(task: Task) {
    this.apiService.addTask(task).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  setUpdatingTask(task: Task) {
    this.updatingTask.next(task);
  }

  getUpdatingTask() {
    return this.updatingTask.asObservable();
  }


  deleteTask(id: number) {
    this.apiService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  updateTask(task: Task) {
    const tasks = this.tasks.getValue();
    tasks[tasks.indexOf(task)] = task;
    this.setUpdatingTask(task);
    this.deleteTask(task.id);
  }

  //TODO
  getDoneTasks() {
    return this.doneTasks as Observable<Task[]>
  }

  addDoneTask(task: Task) {
    this.apiService.addDoneTask(task).subscribe({
      next: () => {
        this.loadTasks();
        this.loadDoneTasks();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
    this.deleteTask(task.id);
  }

  deleteDoneTask(id: number) {
    this.apiService.deleteDoneTask(id).subscribe({
      next: () => {
        this.loadDoneTasks();
      },
      error: (error) => {
        console.error('There was an error!', error)
      }
    })
  }

  recoverDoneTask(task: Task) {
    this.addTask(task)
    this.deleteDoneTask(task.id);
  }
}
