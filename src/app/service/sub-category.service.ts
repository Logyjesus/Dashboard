import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../module/sub-category';
import { BASE_URL } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
 private api = `${BASE_URL}/dashboard/sub-categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(this.api, formData);
  }

  delete(slug: string): Observable<any> {
    return this.http.delete(`${this.api}/${slug}`);
  }
}
