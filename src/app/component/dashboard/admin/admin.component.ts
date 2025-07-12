import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { Seller } from '../../../module/seller';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../../service/dashboard.service';
import { Order } from '../../../module/data-dashboard';
import { SellerService } from '../../../service/seller.service';
import { SellerSidebarComponent } from './seller-sidebar/seller-sidebar.component';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { NavbarAdminComponent } from "./navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule, SellerSidebarComponent, RouterModule, PaginationComponent, NavbarAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  sellersCount = 0;
   
  // ordersCount = 0;
  // usersCount = 0;
  // soldProductsCount = 0;
  // orders: Order[] = [];


  // ngOnInit(): void {
  //   this.dashboardService.getSellers().subscribe(sellers => {
  //     this.sellersCount = sellers.length;
  //   });

  //   this.dashboardService.getUsers().subscribe(users => {
  //     this.usersCount = users.length;
  //   });

  //   this.dashboardService.getOrders().subscribe(orders => {
  //     this.orders = orders;
  //     this.ordersCount = orders.length;

  //     // تقدير عدد المنتجات المباعة (مثلاً كل طلب = منتج)
  //     this.soldProductsCount = orders.length;
  //   });
  // }


 sellers: Seller[] = [];
  filteredSellers: Seller[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  displayedColumns: string[] = ['name', 'store_name', 'email', 'phone', 'actions'];

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadSellers();
    this.loadOrders();
  }
  
  
pagination = {
  currentPage: 1,
  totalPages: 1
}
  loadSellers(page: number = 1): void {
    this.loading = true;

  this.http.get<any>(`http://127.0.0.1:8000/api/dashboard/sellers?page=${page}`).subscribe({
      next: (response) => {
        if (response && response.sellers) {
          this.sellers = response.sellers;
          this.filteredSellers = this.sellers;
          this.sellersCount = this.sellers.length
  this.pagination = {
      currentPage: response.pagination.current_page,
      totalPages: Math.ceil(response.pagination.total / response.pagination.per_page)
    };
    // http://127.0.0.1:8000/api/dashboard/sellers?page=${page}
          console.log(this.sellersCount)
        } else {
          this.sellers = [];
          this.filteredSellers = [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("❌ خطأ في API:", err);
        this.sellers = [];
        this.filteredSellers = [];
        this.loading = false;
      }
    });
  }
  ordersCount: number = 0;

loadOrders(): void {
  this.http.get<any>(`http://127.0.0.1:8000/api/orders`).subscribe({
    next: (res) => {
      const orders = Array.isArray(res) ? res : res.orders || res.data || [];
      this.ordersCount = orders.length;
          this.pagination = res.pagination;

      console.log('📦 عدد الطلبات:', this.ordersCount);
    },
    error: (err) => {
      console.error("❌ خطأ أثناء تحميل الطلبات:", err);
      this.ordersCount = 0;
    }
  });
}


  deleteSeller(slug: string): void {
    if (confirm('هل تريد حذف هذا السيلر؟')) {
      this.sellerService.delete(slug).subscribe({
        next: () => {
          alert('✅ تم حذف السيلر بنجاح');
          this.loadSellers();
        },
        error: (err) => {
          console.error('❌ خطأ أثناء الحذف:', err);
          alert('❌ حدث خطأ أثناء الحذف');
        }
      });
    }
  }

  goToDetail(slug: string): void {
    this.router.navigate(['/sellers', slug]);
  }

  goToEdit(slug: string): void {
    this.router.navigate(['/sellers/edit', slug]);
  }

  filterSellers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredSellers = this.sellers.filter(seller =>
      seller.name.toLowerCase().includes(term) ||
      seller.email.toLowerCase().includes(term) ||
      seller.store_name.toLowerCase().includes(term)
    );
  }
}