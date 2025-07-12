import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerService } from '../../../../../service/seller.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-deller-form',
  standalone:true,
  imports: [MatFormFieldModule ,MatIconModule ,MatButtonModule,MatInputModule , MatListModule ,ReactiveFormsModule,CommonModule],
  templateUrl: './deller-form.component.html',
  styleUrl: './deller-form.component.css'
})
export class DellerFormComponent {
  sellerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      store_name: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirm = form.get('password_confirmation')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  createSeller() {
  
    this.http.post('http://127.0.0.1:8000/api/dashboard/sellers', this.sellerForm.value)
      .subscribe({
        next: (res) => {
          console.log('الرد من السيرفر:', res);
          alert('تم إنشاء حساب البائع بنجاح');
          this.sellerForm.reset();
          this.router.navigate(['/sellers']);
        },
        error: (err) => {
          // ✅ هنا نعرض الرسالة من السيرفر
          if (err.status === 422 && err.error?.message) {
            alert('خطأ: ' + err.error.message);
          } else {
            alert('حدث خطأ غير متوقع');
          }
  
          console.error(err);
        }
      });
  }
  
}