import { Component } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'add-task',
  templateUrl: `./add-task.component.html`,
  styleUrls: ['./add-task.component.css'],

})
export class AddTaskComponent implements OnInit {

  form: FormGroup;
  updatingTask: Task | null;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: 0
    });

    this.form.get('name')?.errors;

    this.taskService.getUpdatingTask().subscribe(task => {
      this.updatingTask = task;
      if (this.updatingTask) {
        // Actualiza el formulario con los valores de la tarea que se está editando
        this.form.setValue({
          name: this.updatingTask.name,
          date: this.updatingTask.date,
          // Agrega los demás campos del formulario aquí
        });
      }
    });
  }

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private apiService: ApiService) {}


  private _oldTask: Task = {
    id: 0,
    name: '',
    date: null
  };

  get oldTask(): Task {
    return this._oldTask;
  }

  public task: Task = {
    id: 0,
    name: '',
    date: null
  };

  submit(): void {
    if (this.form.valid) {
      this.taskService.addTask(this.form.value);
      this.form.reset();

    } else {
      console.log('Invalid form');
    }
  }

  errorsToArray(errors: any) {
    if (errors && !('required' in errors)) {
      return Object.keys(errors);
    } else {
      return [];
    }
  }

  updateTask(oldTask: Task): void {
    this.taskService.updateTask(oldTask);
  }

  randomTask(): void {
    let result = this.apiService.getRandomTask();
    result.subscribe((data: any) => {
      this.task.name = data.todo;
      this.task.date = new Date(Date.now()).toISOString().split('T')[0];

      this.form.setValue({
        name: this.task.name,
        date: this.task.date
      });
    })
  }
}
