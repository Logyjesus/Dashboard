import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../module/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private baseUrl = 'http://127.0.0.1:8000/api/dashboard/sellers'; // عدّل حسب API الخاص بك

  constructor(private http: HttpClient) {}

  getAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.baseUrl);
  }

  get(slug: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrl}/${slug}`);
  }

  create(data: FormData): Observable<Seller> {
    return this.http.post<Seller>(this.baseUrl, data);
  }

  update(slug: string, data: Seller): Observable<Seller> {
    return this.http.patch<Seller>(`${this.baseUrl}/${slug}`, data);
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${slug}`);
  }
}
