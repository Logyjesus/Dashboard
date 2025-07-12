import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  slug: string = '';
  order: any;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.getOrder();
  }

  getOrder() {
    this.http
      .get(`http://127.0.0.1:8000/api/dashboard/orders/${this.slug}`)
      .subscribe({
        next: (res: any) => {
          this.order = res.data || res;
          this.loading = false;
        },
        error: () => {
          alert('❌ فشل في تحميل تفاصيل الطلب');
          this.loading = false;
        },
      });
  }

  getSizes(item: any): string {
    return item.order_item.sizes?.map((s: any) => s.size).join(', ') || 'لا يوجد';
  }

  getColors(item: any): string {
    return item.order_item.colors?.map((c: any) => c.color).join(', ') || 'لا يوجد';
  }

  getImages(item: any): string[] {
    return item.order_item.images?.map((img: any) => img.image_path) || [];
  }

  goBack() {
  this.location.back();
}
}
