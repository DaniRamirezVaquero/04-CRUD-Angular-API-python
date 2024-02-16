import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';

  constructor (private http: HttpClient) { }

  loadTasks (): Observable<any> {
    return this.http.get(`${this.baseUrl}/loadTasks`);
  }

  loadDoneTasks (): Observable<any> {
    return this.http.get(`${this.baseUrl}/loadDoneTasks`)
  }

  addTask (task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.baseUrl}/addTask`, task);
  }

  deleteTask (id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/deleteTask/${id}`);
  }

  addDoneTask (task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${this.baseUrl}/addDoneTask`, task);
  }

  deleteDoneTask (id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/deleteDoneTask/${id}`);
  }

  //API for random task
  private apiUrl = 'https://dummyjson.com/todos/random';

  getRandomTask(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'json' });
  }
}
