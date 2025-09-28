import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../module/user';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from "../../dashboard/admin/navbar-admin/navbar-admin.component";
@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule, MatButtonModule,
    MatIconModule,
    MatListModule, CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    RouterModule, NavbarAdminComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
   users: User[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 1;
  perPage: number = 10;
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number = 1): void {
    this.loading = true;
    this.userService.getUsers(page).subscribe({
      next: (res) => {
        this.users = res.users;
        this.currentPage = res.pagination.current_page;
        this.perPage = res.pagination.per_page;
        this.totalPages = Math.ceil(res.pagination.total / res.pagination.per_page);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب المستخدمين', err);
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
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
    this.router.navigate(['/users', slug]);
  }

  goToEdit(slug: string): void {
    this.router.navigate(['/users/edit', slug]);
  }

  deleteUser(slug: string): void {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      this.userService.deleteUser(slug).subscribe({
        next: () => this.loadUsers(this.currentPage),
        error: (err) => console.error('❌ خطأ أثناء الحذف', err)
      });
    }
  }
}