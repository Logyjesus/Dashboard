import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = [
    { id: 1, productName: 'Laptop', totalPrice: 1200, status: 'Completed' },
    { id: 2, productName: 'Phone', totalPrice: 800, status: 'Pending' },
    { id: 3, productName: 'Headphones', totalPrice: 150, status: 'Shipped' },
    { id: 4, productName: 'Monitor', totalPrice: 300, status: 'Cancelled' },
    { id: 5, productName: 'Keyboard', totalPrice: 100, status: 'Completed' },
    { id: 6, productName: 'Mouse', totalPrice: 50, status: 'Pending' },
  ];

  getOrders(): Observable<any[]> {
    return of(this.orders);
  }
}
