import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../service/admin.service';
import { Admin } from '../../../../module/admin';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
@Component({
  selector: 'app-admin-list',
  standalone:true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, NavbarAdminComponent],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  
  admins: Admin[] = [];
  loading: boolean = true;

  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadAdmins(this.currentPage);
  }

 loadAdmins(page: number = 1): void {
    this.loading = true;
    this.adminService.getAll(page).subscribe({
      next: (res) => {
        this.admins = res.admins;
        this.currentPage = res.pagination.current_page;
        this.perPage = res.pagination.per_page;
        this.totalPages = Math.ceil(res.pagination.total / res.pagination.per_page);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب الأدمنز', err);
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadAdmins(page);
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

  goToDetails(slug: string): void {
    this.router.navigate(['/admin', slug]);
  }

  goToEdit(slug: string): void {
    this.router.navigate(['/admin/edit', slug]);
  }

  deleteAdmin(slug: string): void {
    if (confirm('هل أنت متأكد من حذف هذا الأدمن؟')) {
      this.adminService.delete(slug).subscribe({
        next: () => this.loadAdmins(this.currentPage),
        error: (err) => console.error('❌ خطأ أثناء الحذف', err)
      });
    }
  }
}