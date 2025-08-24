import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';
import { Admin } from '../../../module/admin';
@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
   admin: Admin = {
    name: '',
    email: '',
    phone: '',
    store_name: '',
    address: '',
    role: 'admin',
    slug: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  createAdmin(): void {
    if (!this.admin.password || this.admin.password !== this.admin.password_confirmation) {
      alert('❌ تأكد من أن كلمة المرور وتأكيدها متطابقان');
      return;
    }

    this.adminService.create(this.admin).subscribe({
      next: () => {
        alert('✅ تم إنشاء الأدمن بنجاح');
        this.router.navigate(['/Admins']);
      },
      error: (err) => {
        console.error('❌ خطأ في إنشاء الأدمن:', err);
        alert('❌ فشل في إنشاء الأدمن:\n' + (err?.error?.message || 'تفاصيل غير معروفة'));
      }
    });
  }
}