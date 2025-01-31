import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
register() {
throw new Error('Method not implemented.');
}
  users: { email: string; password: string; role: string }[] = [];

  email: string = '';
  password: string = '';
  role: string = 'seller'; // Default role is seller

  constructor(private router: Router) {}

  // register() {
  //   if (this.email && this.password) {
  //     this.users.push({ email: this.email, password: this.password, role: this.role });
  //     localStorage.setItem('users', JSON.stringify(this.users));
  //     alert('Registration successful! Please login.');
  //     this.router.navigate(['/login']);
  //   } else {
  //     alert('Please fill in all fields!');
  //   }
  // }

}
