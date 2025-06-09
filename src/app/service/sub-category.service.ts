import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../module/sub-category';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
   private apiUrl = 'http://127.0.0.1:8000/api/dashboard/sub-categories';

  constructor(private http: HttpClient) {}

  // Get the auth token from local storage or a secure storage service


  // Get all subcategories
  // getSubcategories(subcategorySlug: string): Observable<SubCategory[]> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.getToken()}`
  //   });

  //   return this.http.get<SubCategory[]>(this.apiUrl, { headers });
  // }
  getSubcategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}`);
  }

  // Get a single subcategory by slug
  getSubcategory(slug: string): Observable<SubCategory> {

    return this.http.get<SubCategory>(`${this.apiUrl}/${slug}`);
  }

  // Create a new subcategory
  createSubcategory(formData: FormData): Observable<SubCategory> {

    return this.http.post<SubCategory>(this.apiUrl, formData);
  }

  // Update an existing subcategory
  updateSubcategory(slug: string, formData: FormData): Observable<SubCategory> {
   

    // Use PATCH method as shown in the API documentation
    return this.http.patch<SubCategory>(`${this.apiUrl}/${slug}`, formData);
  }

  // Delete a subcategory
  deleteSubcategory(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${slug}`);
  }
}
