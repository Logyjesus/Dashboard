import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
// import { DashboardService } from '../../../service/services/dashboard.service';
import { OnInit } from '@angular/core';
import { NavBarSellerComponent } from './nav-bar-seller/nav-bar-seller.component';

@Component({
  selector: 'app-seller',
  standalone : true,
  imports: [ RouterModule ,CommonModule,FormsModule,NavBarSellerComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent implements OnInit  {

 stats: any = {};
  allOrders: any[] = [];
  orders: any[] = [];
  selectedStatus: string = 'all';
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    this.loadOrders();
  }



loadOrders(): void {
  this.http.get('http://127.0.0.1:8000/api/dashboard/orders').subscribe({
    next: (res: any) => {
      this.allOrders = res.orders;

      // حساب الإحصائيات يدويًا
      const all = res.orders;

      const stats = {
        sales: all.length,
        revenue: 0,
        pending_orders: 0,
        completed_orders: 0,
        processing_orders: 0

      };

      for (let order of all) {
        if (order.status === 'pending') stats.pending_orders++;
        if (order.status === 'completed') stats.completed_orders++;
        if (order.status === 'processing') stats.processing_orders++;


        for (let item of order.order_items) {
          stats.revenue += Number(item.price) * Number(item.quantity);
        }
      }

      this.stats = stats;
      this.filterOrders();
      this.loading = false;
    },
    error: () => {
      alert('❌ فشل تحميل الطلبات');
      this.loading = false;
    }
  });
}


  filterOrders(): void {
    if (this.selectedStatus === 'all') {
      this.orders = this.allOrders;
    } else {
      this.orders = this.allOrders.filter(order => order.status === this.selectedStatus);
    }
  }

  addProduct(): void {
    this.router.navigate(['/dashboard/products/new']);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
  goTooorders(): void {
    this.router.navigate(['/orders']);
  }
  goToCategory(): void {
    this.router.navigate(['/seller-category']);
  }
  
}