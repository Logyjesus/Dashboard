import { Component } from '@angular/core';
import { Seller } from '../../../../../module/seller';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../../../../../service/seller.service';

@Component({
  selector: 'app-seller-details',
  standalone:true,
  imports: [],
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.css'
})
export class SellerDetailsComponent {
  seller?: Seller;
  loading = false;

  constructor(private route: ActivatedRoute, private sellerService: SellerService) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loading = true;
      this.sellerService.get(slug).subscribe({
        next: (res) => { this.seller = res; this.loading = false; },
        error: () => { this.loading = false; }
      });
    }
  }
}
