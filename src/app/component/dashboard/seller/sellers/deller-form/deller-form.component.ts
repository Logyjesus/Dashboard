import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerService } from '../../../../../service/seller.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-deller-form',
  standalone:true,
  imports: [MatFormFieldModule ,MatIconModule ,MatButtonModule,MatInputModule , MatListModule ,ReactiveFormsModule],
  templateUrl: './deller-form.component.html',
  styleUrl: './deller-form.component.css'
})
export class DellerFormComponent {
  sellerForm: FormGroup;
  submitting = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private router: Router
  ) {
    this.sellerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      address: [''],
      store_name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.sellerForm.invalid) return;

    if(this.sellerForm.value.password !== this.sellerForm.value.password_confirmation){
      this.error = 'كلمتا المرور غير متطابقتين';
      return;
    }

    this.error = undefined;
    this.submitting = true;

    // عمل FormData
    const formData = new FormData();
    Object.entries(this.sellerForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    this.sellerService.create(formData).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/sellers']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = 'حدث خطأ أثناء الإضافة';
        console.error(err);
      }
    });
  }
}
