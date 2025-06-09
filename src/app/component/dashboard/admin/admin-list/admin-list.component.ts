import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../service/admin.service';
import { Admin } from '../../../../module/admin';
@Component({
  selector: 'app-admin-list',
  standalone:true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  admins: Admin[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAll().subscribe(data => this.admins = data);
  }

  deleteAdmin(slug: string) {
    if (confirm('هل تريد حذف هذا الأدمن؟')) {
      this.adminService.delete(slug).subscribe(() => {
        this.admins = this.admins.filter(a => a.slug !== slug);
      });
    }
  }
}
