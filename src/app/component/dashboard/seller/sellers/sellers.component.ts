import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { SellerService } from '../../../../service/seller.service';
import { Seller } from '../../../../module/seller';
import { NavbarAdminComponent } from "../../admin/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-sellerss',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    NavbarAdminComponent
],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellerssComponent implements OnInit {
  sellers: Seller[] = [];
  filteredSellers: Seller[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  displayedColumns: string[] = ['name', 'store_name', 'email', 'phone', 'actions'];
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  constructor(
    private sellerService: SellerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSellers();
  }


  loadSellers(page: number = 1): void {
    this.loading = true;
    this.sellerService.getAll(page).subscribe({
      next: (response) => {
        if (response && response.sellers) {
          this.sellers = response.sellers;
          this.filteredSellers = this.sellers;

          // 🟦 استخرج بيانات الصفحة
          this.currentPage = response.pagination?.current_page || 1;
          this.perPage = response.pagination?.per_page || 10;
          const totalItems = response.pagination?.total || 1;
          this.totalPages = Math.ceil(totalItems / this.perPage);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error("❌ خطأ في تحميل البائعين:", err);
        this.loading = false;
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.loadSellers(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadSellers(this.currentPage + 1);
    }
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
