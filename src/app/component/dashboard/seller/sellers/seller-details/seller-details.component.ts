import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SellerService } from '../../../../../service/seller.service';

@Component({
  selector: 'app-seller-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.css'
})
export class SellerDetailsComponent {
  slug!: string;
  seller: any = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.loadSeller();
  }

  loadSeller(): void {
    this.loading = true;
    this.sellerService.getBySlug(this.slug).subscribe({
      next: (res) => {
        this.seller = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في جلب بيانات البائع', err);
        this.loading = false;
      }
    });
  }

  backToList(): void {
    this.router.navigate(['/sellers']);
  }
}