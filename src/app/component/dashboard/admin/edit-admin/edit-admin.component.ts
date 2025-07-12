import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../../module/admin';
import { AdminService } from '../../../../service/admin.service';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  admin: Admin = {
    name: '',
    email: '',
    phone: '',
    store_name: '',
    address: '',
    role: '',
    slug: '',
    password: '',
    password_confirmation: ''
  };

  slug: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.loadAdmin();
  }

  loadAdmin(): void {
    this.loading = true;
    this.adminService.getBySlug(this.slug).subscribe({
      next: (data: Admin) => {
        // تأكد من نسخ البيانات كما هي
        this.admin = { ...data, password: '', password_confirmation: '' };
        this.loading = false;
      },
      error: () => {
        alert('❌ لم يتم العثور على بيانات الأدمن');
        this.router.navigate(['/Admins']);
      }
    });
  }

  updateAdmin(): void {
    const data = { ...this.admin };

    // لو مفيش كلمة مرور، احذفها
    if (!data.password) {
      delete data.password;
      delete data.password_confirmation;
    } else if (data.password !== data.password_confirmation) {
      alert('❌ كلمة المرور وتأكيدها غير متطابقين!');
      return;
    }

    this.adminService.update(this.slug, data).subscribe({
      next: (res) => {
        alert('✅ تم تحديث بيانات الأدمن بنجاح');
        this.router.navigate(['/Admins']);
      },
      error: (err) => {
        console.error('❌ خطأ أثناء التحديث:', err);
        alert('❌ حدث خطأ أثناء التحديث:\n' + (err?.error?.message || 'تفاصيل غير معروفة'));
      }
    });
  }
  backToList(){
    this.router.navigate(['/Admins'])
  }
}