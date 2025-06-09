import { Injectable } from '@angular/core';
import { Category } from '../module/category';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CayegoryService {
  private apiUrl = "http://127.0.0.1:8000/api/dashboard/categories";

  constructor(private http:HttpClient) { }


  // Get the auth token from local storage or a secure storage service

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${slug}`);
  }

  
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }
  
  updateCategory(slug: string, category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${slug}`, category);
  }
  
  deleteCategory(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${slug}`);
  }
  
}
