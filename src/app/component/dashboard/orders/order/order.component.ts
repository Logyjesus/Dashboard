import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NavBarSellerComponent } from '../../seller/nav-bar-seller/nav-bar-seller.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,NavBarSellerComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  allOrders: any[] = [];
  filteredOrders: any[] = [];
  loading = false;
  selectedStatus: string = 'all';

  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

   loadOrders(page: number = 1): void {
    this.loading = true;
    this.http.get<any>(`http://127.0.0.1:8000/api/dashboard/orders?page=${page}`).subscribe({
      next: (res) => {
        this.allOrders = res.orders;
        this.currentPage = res.pagination.current_page;
        this.perPage = res.pagination.per_page;
        this.totalPages = Math.ceil(res.pagination.total / res.pagination.per_page);
        this.filterOrders();
        this.loading = false;
      },
      error: () => {
        alert('❌ فشل تحميل الطلبات');
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadOrders(page);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  filterOrders(): void {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = this.allOrders;
    } else {
      this.filteredOrders = this.allOrders.filter(order => order.status === this.selectedStatus);
    }
  }

  // deleteOrder(slug: string): void {
  //   if (!confirm('❗ هل أنت متأكد من حذف الطلب؟')) return;

  //   this.http.delete(`http://127.0.0.1:8000/api/dashboard/orders/${slug}`).subscribe({
  //     next: () => {
  //       alert('✅ تم حذف الطلب بنجاح');
  //       this.loadOrders(this.currentPage); // إعادة تحميل الطلبات
  //     },
  //     error: () => alert('❌ فشل في حذف الطلب')
  //   });
  // }

  editOrder(slug: string): void {
    this.router.navigate([`/orders/${slug}/edit`]);
  }

  getSizesText(orderItem: any): string {
    return orderItem.sizes?.map((s: any) => s.size).join(', ') || '';
  }

  getColorsText(orderItem: any): string {
    return orderItem.colors?.map((c: any) => c.color).join(', ') || '';
  }

  getImages(orderItem: any): string[] {
    return orderItem.images?.map((img: any) => img.image_path) || [];
  }
  

}