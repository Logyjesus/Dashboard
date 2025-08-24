import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-product-seller',
  imports: [],
  templateUrl: './product-seller.component.html',
  styleUrl: './product-seller.component.css'
})
export class ProductSellerComponent {
  seller = {
    id: 1,
    name: 'بائع 1',
    email: 'seller1@example.com',
    totalSales: 120,
    totalRevenue: 8000

  };

  products = [
    { id: 1, name: 'منتج 1', description: 'وصف المنتج 1', price: 100, sold: 80 },
    { id: 2, name: 'منتج 2', description: 'وصف المنتج 2', price: 150, sold: 60 },
    { id: 3, name: 'منتج 3', description: 'وصف المنتج 3', price: 200, sold: 40 },
    { id: 1, name: 'منتج 1', description: 'وصف المنتج 1', price: 100, sold: 80 },
    { id: 2, name: 'منتج 2', description: 'وصف المنتج 2', price: 150, sold: 60 },
    { id: 3, name: 'منتج 3', description: 'وصف المنتج 3', price: 200, sold: 40 },
    { id: 1, name: 'منتج 1', description: 'وصف المنتج 1', price: 100, sold: 80 },
    { id: 2, name: 'منتج 2', description: 'وصف المنتج 2', price: 150, sold: 60 },
    { id: 3, name: 'منتج 3', description: 'وصف المنتج 3', price: 200, sold: 40 },
  ];

  chart: any;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.products.map(product => product.name),
        datasets: [{
          label: 'مبيعات المنتجات',
          data: this.products.map(product => product.sold),
          backgroundColor: ['#007bff', '#28a745', '#dc3545'],
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

