import { Component } from '@angular/core';
import { AddProductComponent } from "./add-product/add-product.component";
import { Router } from '@angular/router';
// import { DashboardService } from '../../../service/services/dashboard.service';

@Component({
  selector: 'app-seller',
  imports: [AddProductComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {

  stats = {
    Sales : {
      name : ' Total Sales',
      value : 700,
      icon : 'fas fa-shopping-cart'
    },
    Revenue :{
      name : 'Total Revenue',
      value : '5000$',
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
      Status : 'Canceled',
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

  addProduct(): void {
    this.router.navigate(['/add_product']);
  }



  // stats: any = {};
  // orders: any[] = [];

  // constructor(private dashboardService: DashboardService) {}

  // ngOnInit(): void {
  //   this.loadStats();
  //   this.loadOrders();
  // }

  // loadStats(): void {
  //   this.dashboardService.getStats().subscribe((data) => {
  //     this.stats = data;
  //   });
  // }

  // loadOrders(): void {
  //   this.dashboardService.getOrders().subscribe((data) => {
  //     this.orders = data;
  //   });
  // }

}
