import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  login() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
  
    this.auth.login(email, password).subscribe({
      next: (res) => {
        console.log('رد السيرفر:', res);
    
        const token = res.token;
        const user = res.seller;
        const role = user.role?.trim().toLowerCase();
    
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(user));
    
        if (role === 'admin') {
          this.router.navigate(['/dashboard/admin']);
        } else if (role === 'seller') {
          this.router.navigate(['/dashboard/seller']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.errorMsg = 'فشل في تسجيل الدخول';
      }
    });
  }



}