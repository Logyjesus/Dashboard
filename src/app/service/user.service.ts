import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../module/order';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl ="http://127.0.0.1:8000/api/dashboard/users"
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserBySlug(slug: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${slug}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(slug: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${slug}`, user);
  }

  deleteUser(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}
