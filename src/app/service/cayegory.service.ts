import { Injectable } from '@angular/core';
import { Category } from '../module/category';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CayegoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/dashboard/categories';

  constructor(private http: HttpClient) {}

create(data: FormData): Observable<any> {
  return this.http.post(this.apiUrl, data);
}

updateCategory(slug: string, formData: FormData) {
  return this.http.patch(`${this.apiUrl}/${slug}`, formData);
}


getAll(): Observable<Category[]> {
  return this.http.get<Category[]>(this.apiUrl);
}

  getBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${slug}`);
  }

  // create(category: any): Observable<any> {
  //   return this.http.post(this.apiUrl, category);
  // }
  
  //  update(slug: string, formData: FormData): Observable<any> {
  //   return this.http.patch<any>(`${this.apiUrl}/${slug}`, formData);
  // }

  delete(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}