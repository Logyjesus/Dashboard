import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeleteOrderResponse, Order, OrdersResponse, OrderStatus } from '../module/order';
import { BASE_URL } from 'app/constants';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private orders = [
  //   { id: 1, productName: 'Laptop', totalPrice: 1200, status: 'Completed' },
  //   { id: 2, productName: 'Phone', totalPrice: 800, status: 'Pending' },
  //   { id: 3, productName: 'Headphones', totalPrice: 150, status: 'Shipped' },
  //   { id: 4, productName: 'Monitor', totalPrice: 300, status: 'Cancelled' },
  //   { id: 5, productName: 'Keyboard', totalPrice: 100, status: 'Completed' },
  //   { id: 6, productName: 'Mouse', totalPrice: 50, status: 'Pending' },
  // ];

  // getOrders(): Observable<any[]> {
  //   return of(this.orders);
  // }
  private http = inject(HttpClient);
  private baseUrl = `${BASE_URL}/login/dashboard`;

  // Hardcoded token - replace with your actual token
  private token = '19|w7DxM5O0UBSsTOB37AlxmeLq9mbWajxLELOGe6K2813b767c';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
  }

  getAllOrders(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.baseUrl}/orders`, {
      headers: this.getHeaders()
    });
  }

  getOrderDetails(orderSlug: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${orderSlug}`, {
      headers: this.getHeaders()
    });
  }

  updateOrderStatus(orderSlug: string, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(
      `${this.baseUrl}/orders/${orderSlug}`,
      { status },
      { headers: this.getHeaders() }
    );
  }

  deleteOrder(orderSlug: string): Observable<DeleteOrderResponse> {
    return this.http.delete<DeleteOrderResponse>(
      `${this.baseUrl}/orders/${orderSlug}`,
      { headers: this.getHeaders() }
    );
  }
}
