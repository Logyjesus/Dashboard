import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  // محاكاة بيانات البائعين
  sellers = [
    { id: 1, name: 'بائع 1' },
    { id: 2, name: 'بائع 2' },
    { id: 3, name: 'بائع 3' }
  ];

  // محاكاة بيانات الطلبات
  ordersData: { [key: number]: { id: number, customer: string, amount: number, status: string }[] } = {
    1: [
      { id: 101, customer: 'عميل 1', amount: 200, status: 'مكتمل' },
      { id: 102, customer: 'عميل 2', amount: 300, status: 'قيد التنفيذ' }
    ],
    2: [
      { id: 201, customer: 'عميل 3', amount: 400, status: 'ملغي' },
      { id: 202, customer: 'عميل 4', amount: 500, status: 'مكتمل' }
    ],
    3: [
      { id: 301, customer: 'عميل 5', amount: 600, status: 'قيد التنفيذ' },
      { id: 302, customer: 'عميل 6', amount: 700, status: 'مكتمل' }
    ]
  };

  // محاكاة بيانات الإحصائيات لكل بائع
  statisticsData: { [key: number]: { totalSales: number, totalRevenue: number, completedOrders: number, pendingOrders: number } } = {
    1: { totalSales: 10, totalRevenue: 1000, completedOrders: 5, pendingOrders: 2 },
    2: { totalSales: 8, totalRevenue: 800, completedOrders: 4, pendingOrders: 3 },
    3: { totalSales: 12, totalRevenue: 1200, completedOrders: 6, pendingOrders: 4 }
  };

  orders: any[] = [];
  sellerStats: any = {};
  selectedSeller: number | undefined; // تحديد النوع ليكون number
  selectedSellerForStats: number | undefined; // تحديد النوع ليكون number

  seller = { name: '', email: '' }; // بيانات البائع الجديد
ordersCount: any;
sellersCount: any;
soldProductsCount: any;

  // إضافة بائع جديد
  addSeller() {
    const newSeller = { id: this.sellers.length + 1, name: this.seller.name, email: this.seller.email };
    this.sellers.push(newSeller);
    this.seller.name = '';
    this.seller.email = '';
    alert('تم إضافة البائع بنجاح');
  }

  // الحصول على الطلبات الخاصة بالبائع
  getOrdersForSeller() {
    if (this.selectedSeller !== undefined) {
      this.orders = this.ordersData[this.selectedSeller] || [];
    }
  }

  // الحصول على إحصائيات البائع
  getStatisticsForSeller() {
    if (this.selectedSellerForStats !== undefined) {
      this.sellerStats = this.statisticsData[this.selectedSellerForStats] || {};
    }
  }
}
