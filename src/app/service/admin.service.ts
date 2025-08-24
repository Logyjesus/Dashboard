import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../module/admin';
import { map, Observable } from 'rxjs';
import { BASE_URL } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${BASE_URL}/dashboard/admins`;

  constructor(private http: HttpClient) {}

  // getAll(): Observable<Admin[]> {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     map(response => response.admins) // ترجعلك قائمة الأدمنز مباشرة
  //   );
  // }
  
  getAll(page: number = 1): Observable<{ admins: Admin[], pagination: any }> {
  return this.http.get<any>(`${this.apiUrl}?page=${page}`);
}

  getBySlug(slug: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${slug}`);
  }

  create(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, adminData);
  }
  

  update(slug: string, data: any) {
    return this.http.patch(`${this.apiUrl}/${slug}`, data);
  }

  delete(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}
