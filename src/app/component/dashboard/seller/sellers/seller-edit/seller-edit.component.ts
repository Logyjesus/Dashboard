import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerService } from '../../../../../service/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-seller-edit',
  standalone:true,
  imports: [MatFormFieldModule ,MatIconModule ,MatButtonModule,MatInputModule , MatListModule ,ReactiveFormsModule],
  templateUrl: './seller-edit.component.html',
  styleUrl: './seller-edit.component.css'
})
export class SellerEditComponent {
  sellerForm: FormGroup;
  slug!: string;
  loading = false;
  submitting = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private sellerService: SellerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sellerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      store_name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.loading = true;
    this.sellerService.get(this.slug).subscribe({
      next: (res) => {
        this.sellerForm.patchValue(res);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'حدث خطأ أثناء جلب بيانات السيلر';
      }
    });
  }

  onSubmit() {
    if (this.sellerForm.invalid) return;

    this.submitting = true;
    this.error = undefined;

    // بيانات تحديث x-www-form-urlencoded (كائن عادي)
    this.sellerService.update(this.slug, this.sellerForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/sellers']);
      },
      error: () => {
        this.submitting = false;
        this.error = 'حدث خطأ أثناء التحديث';
      }
    });
  }
}
