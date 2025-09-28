import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../module/user';
import { BASE_URL } from 'app/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${BASE_URL}/dashboard/users`;

  constructor(private http: HttpClient) {}

  createuser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // ✅ تعديل هنا: استرجاع المستخدمين مع بيانات التقسيم
  getUsers(page: number = 1): Observable<{ users: User[], pagination: any }> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(res => ({
        users: res.users,
        pagination: res.pagination
      }))
    );
  }

  getUserBySlug(slug: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${slug}`);
  }

  updateUser(slug: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${slug}`, user);
  }

  deleteUser(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}