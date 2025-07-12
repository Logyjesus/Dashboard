import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Seller } from '../module/seller';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  get(slug: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://127.0.0.1:8000/api/dashboard/sellers';
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}
  
getAll(page: number = 1): Observable<any> {
  return this.http.get(`${this.baseUrl}?page=${page}`);
}


  delete(slug: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${slug}`);
  }

  getBySlug(slug: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrl}/${slug}`);
  }

  update(slug: string, data: any) {
    return this.http.put(`${this.baseUrl}/${slug}`, data);
  }
  getAllOrders() {
  return this.http.get(`${this.apiUrl}/api/dashboard/orders`);
}

}
