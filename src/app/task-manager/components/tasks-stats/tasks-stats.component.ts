import { Component, ElementRef, ViewChild} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task.interface';


Chart.register(...registerables);

@Component({
  selector: 'app-tasks-stats',
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.css']
})
export class TasksStatsComponent {

  @ViewChild('chart') private chartRef!: ElementRef;

  tasksLoaded = false;
  tasksData = [];
  chart: any;
  doneTasks: Task[];

  constructor(private taskService: TaskService) {
    this.chartRef = {} as ElementRef;
    this.taskService.getDoneTasks().subscribe(doneTasks => {
      this.doneTasks = doneTasks; // Aquí this.doneTasks ya tiene los datos
      this.tasksData = this.calculateTasksPerMonth(this.doneTasks);
      this.tasksLoaded = true;
    });
  }

  ngAfterViewInit(): void {
    if (this.tasksLoaded) {
      this.createChart();
    }
  }

  calculateTasksPerMonth(doneTasks: Task[]): Array<number> {
    const tasksPerMonth = new Array(12).fill(0);

    doneTasks.forEach(task => {
      const date = new Date(task.date);
      const month = date.getMonth();
      tasksPerMonth[month] += 1;
    });

    return tasksPerMonth;
  }

  createChart(): void {
    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Tareas al mes',
        data: this.tasksData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: data,
    });
  }
}

