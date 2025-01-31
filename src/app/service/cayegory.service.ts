import { Injectable } from '@angular/core';
import { Category } from '../component/module/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CayegoryService {
  getCategoryById(id: number) {
    throw new Error('Method not implemented.');
  }

  category : Category = {}as Category;
private apiUlr = "https://api.escuelajs.co/api/v1/categories";
constructor(private http : HttpClient){}
  createCategory(category : Category): Observable<Category>{
    return this.http.post<Category>(this.apiUlr, category);

  }
}
