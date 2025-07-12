import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerService } from '../../../../../service/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Seller } from '../../../../../module/seller';

@Component({
  selector: 'app-seller-edit',
  standalone:true,
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,],
  templateUrl: './seller-edit.component.html',
  styleUrl: './seller-edit.component.css'
})
export class SellerEditComponent {
  seller: Seller | null = null;
  slug: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    console.log('📦 Slug:', this.slug);

    if (this.slug) {
      this.sellerService.getBySlug(this.slug).subscribe({
        next: (response) => {
          console.log('✅ بيانات البائع:', response);
          this.seller = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('❌ خطأ في تحميل البائع:', err);
          this.seller = null;
          this.loading = false;
        }
      });
    }
  }

  updateSeller(): void {
    if (this.seller && this.slug) {
      this.sellerService.update(this.slug, this.seller).subscribe({
        next: () => {
          alert('✅ تم تحديث بيانات البائع بنجاح!');
          this.router.navigate(['/sellers']);
        },
        error: (err) => {
          console.error('❌ خطأ أثناء تحديث البائع:', err);
        }
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/sellers']);
  }
}