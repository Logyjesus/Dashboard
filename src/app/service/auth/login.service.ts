import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(email: string, password: string, role: string): Observable<any> {
    // Simulate API response
    if (email === 'admin@example.com' && password === 'admin123' && role === 'Admin') {
      return of({ success: true, token: 'fake-jwt-token-admin', role: 'Admin' });
    }
    else if (email === 'seller@example.com' && password === 'seller123' && role === 'Seller') {
      return of({ success: true, token: 'fake-jwt-token-seller', role: 'Seller' });
    }
    else {
      return of({ success: false, message: 'Invalid credentials or role' });
    }
  }
}
