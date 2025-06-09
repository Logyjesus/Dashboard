import { Component } from '@angular/core';
import { SellerService } from '../../../../service/seller.service';
import { Seller } from '../../../../module/seller';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sellers',
  standalone:true,
  imports: [MatListModule,
      MatIconModule,CommonModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent {
  sellers: Seller[] = [];
  loading = false;

  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit() {
    this.loadSellers();
  }

  loadSellers() {
    this.loading = true;
    this.sellerService.getAll().subscribe({
      next: (res) => { this.sellers = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  deleteSeller(slug: string) {
    if(confirm('هل تريد حذف هذا السيلر؟')) {
      this.sellerService.delete(slug).subscribe(() => {
        this.loadSellers();
      });
    }
  }

  goToDetail(slug: string) {
    this.router.navigate(['/sellers', slug]);
  }

  goToEdit(slug: string) {
    this.router.navigate(['/sellers/edit', slug]);
  }
}

