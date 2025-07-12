import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../module/user';

@Component({
  selector: 'app-user-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user :User=  {
    id : 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.userService.createuser(this.user).subscribe({
      next: () => {
        alert('✅ تم إنشاء المستخدم بنجاح');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('❌ خطأ في إنشاء المستخدم:', err);
        alert('❌ فشل إنشاء المستخدم:\n' + (err?.error?.message || 'تفاصيل غير معروفة'));
      }
    });
  }}