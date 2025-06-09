import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../module/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/dashboard/admins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getBySlug(slug: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${slug}`);
  }

  create(admin: Admin): Observable<any> {
    const formData = new FormData();
    formData.append('name', admin.name);
    formData.append('email', admin.email);
    formData.append('password', admin.password!);
    formData.append('password_confirmation', admin.password_confirmation!);
    return this.http.post(this.apiUrl, formData);
  }

  update(slug: string, admin: Admin): Observable<any> {
    const formData = new FormData();
    formData.append('name', admin.name);
    formData.append('email', admin.email);
    if (admin.password) {
      formData.append('password', admin.password);
      formData.append('password_confirmation', admin.password_confirmation!);
    }
    return this.http.patch(`${this.apiUrl}/${slug}`, formData);
  }

  delete(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}
