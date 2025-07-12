import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  standalone:true ,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterModule,MatCardModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})


export class EditOrderComponent implements OnInit {
  slug: string = '';
  order: any = { status: '' };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.getOrder();
  }

  getOrder(): void {
    this.http.get(`http://127.0.0.1:8000/api/dashboard/orders/${this.slug}`).subscribe({
      next: (res: any) => {
        this.order = res.order;
      },
    });
  }

  updateOrder(): void {
    this.http.patch(`http://127.0.0.1:8000/api/dashboard/orders/${this.slug}`, { status: this.order.status }).subscribe({
      next: () => {
        alert('✅ تم تعديل حالة الطلب بنجاح');
        this.router.navigate(['/orders']);
      },
      error: () => alert('❌ فشل تعديل الطلب')
    });
  }
}