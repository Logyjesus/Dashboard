import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../module/sub-category';


@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
 private api = 'http://127.0.0.1:8000/api/dashboard/sub-categories';

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
