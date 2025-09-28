import { Component } from '@angular/core';
import { StatisticsService } from '../../../../../service/services/statistics.service';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statistics',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  /*  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['هاتف سامسونج', 'لابتوب ديل', 'ساعة ذكية'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  // البيانات التي سيتم تحديثها من الخدمة
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'المبيعات' }
    ]
  };

  statistics: any;  // لتخزين البيانات المسترجعة

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    // استدعاء الخدمة لجلب البيانات
    this.statisticsService.getStatistics().subscribe(data => {
      // افترض أن البيانات تحتوي على المبيعات لكل منتج
      this.barChartData.datasets[0].data = data.sales;  // تحديث البيانات
      this.barChartLabels = data.labels;  // تحديث التسميات إذا كانت مختلفة
    });
  }*/

    stats = {
      Sales : {
        name : ' Total Sales',
        value : 700,
        icon : 'fas fa-shopping-cart'
      },
      Revenue :{
        name : 'Total Revenue',
        value : 5000,
        icon : 'fas fa-money-check-alt'
       },
       Pending : {
        name : ' Pending Orders',
        value : 500,
        icon : 'fas fa-exclamation-triangle'
       },
       copleted : {
        name : ' Completed Orders',
        value : 200,
        icon : 'fas fa-check-circle'
       }
    }
    Order_Details ={
      order_one : {
        id : 1,
        Customer : 'johne voor',
        Status : 'Completed',
        Amount : 400,
        Date : '2025-01-05',

      },
      order_two : {
        id : 2,
        Customer : 'mary smith',
        Status : 'Pending',
        Amount : 600,
        Date : '2025-01-03',
      },
      order_three : {
        id : 3,
        Customer : 'sarah williams',
        Status : 'Completed',
        Amount : 200,
        Date : '2025-01-06',
      },
      order_four : {
        id : 4,
        Customer : 'bill gates',
        Status : 'Shipped',
        Amount : 800,
        Date : '2025-01-02',
      },
      order_five : {
        id : 5,
        Customer : 'bill gates',
        Status : 'Shipped',
        Amount : 800,
        Date : '2025-01-04',
      },
      order_six : {
        id : 6,
        Customer : 'bill gates',
        Status : 'Shipped',
        Amount : 800,
        Date : '2025-01-03',
      }

    }
    orders = Object.values(this.Order_Details);
    constructor(private router: Router) {}




  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: string[] = ['Completed Orders','Pending Orders', '  Total Sales'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  // ✅ التعديل هنا
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [this.stats.copleted.value ,this.stats.Pending.value , this.stats.Sales.value ], label: 'المبيعات' }
    ]
  };
statistics: any;









}


