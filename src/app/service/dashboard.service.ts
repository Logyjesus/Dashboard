import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, User } from '../module/data-dashboard';
import { Observable } from 'rxjs';
import { Seller } from '../module/login-response';
import { BASE_URL } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 private apiBase = `${BASE_URL}/login/dashboard`;

  constructor(private http: HttpClient) {}

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(`${this.apiBase}/sellers`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiBase}/orders`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBase}/users`);
  }}