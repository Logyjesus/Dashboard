import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private userRole: string | null = null;

  login(role: string) {
    this.isLoggedIn = true;
    this.userRole = role;
    localStorage.setItem('role', role);
  }

  logout() {
    this.isLoggedIn = false;
    this.userRole = null;
    localStorage.clear();
  }

  isAuthenticated() {
    return this.isLoggedIn || !!localStorage.getItem('role');
  }

  getRole() {
    return this.userRole || localStorage.getItem('role');
  }
}
