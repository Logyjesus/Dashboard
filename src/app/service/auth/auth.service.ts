import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getRole() {
    throw new Error('Method not implemented.');
  }
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
   private apiUrl = 'http://127.0.0.1:8000/api/dashboard/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }
  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
}

}
