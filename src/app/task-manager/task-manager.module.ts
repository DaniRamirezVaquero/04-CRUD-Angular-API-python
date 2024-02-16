import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { mainPageComponent } from './pages/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DoneTasksComponent } from './components/done-tasks/done-tasks.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksStatsComponent } from './components/tasks-stats/tasks-stats.component';

@NgModule({
  declarations: [
    mainPageComponent,
    ListComponent,
    AddTaskComponent,
    DoneTasksComponent,
    TasksStatsComponent,
  ],
  exports: [
    mainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
})
export class taskManagerModule { }

