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
    name: '', email: '', password: '', password_confirmation: '',
    store_name: '',
    phone: 0,
    address: ''
  };

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit() {
    this.adminService.create(this.admin).subscribe(() => {
      alert('تم إنشاء الأدمن بنجاح');
      this.router.navigate(['/admin']);
    });
  }
}
