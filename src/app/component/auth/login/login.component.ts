import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../service/auth/login.service';
// import axios from 'axios';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';

  // constructor(private router: Router) {}

  // login() {
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const user = users.find((u: any) => u.email === this.email && u.password === this.password);

  //   if (user) {
  //     if (user.role === 'admin') {
  //       this.router.navigate(['/dashboard/admin']);
  //     } else if (user.role === 'seller') {
  //       this.router.navigate(['/dashboard/seller']);
  //     }
  //   } else {
  //     alert('Invalid email or password!');
  //   }
  // }
//   loginForm: FormGroup;

//   constructor(private router: Router) {
//     this.loginForm = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [Validators.required]),
//       role: new FormControl('', Validators.required),
//     });
//   }

//   async onLogin() {
//     if (this.loginForm.valid) {
//       try {
//         const response = await axios.post('http://localhost:5000/login', this.loginForm.value);
//         const { token, role } = response.data;

//         // Save the token (e.g., localStorage)
//         localStorage.setItem('token', token);

//         // Redirect based on role
//         if (role === 'admin') {
//           this.router.navigate(['/dashboard/admin']);
//         } else if (role === 'seller') {
//           this.router.navigate(['/dashboard/seller']);
//         }
//       } catch (err: any) {
//         alert(err.response.data.message || 'Error occurred');
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   }
loginForm: FormGroup;
  loginError: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService
    ,    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['seller', Validators.required], // Default role is seller
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password,role} = this.loginForm.value;
      this.loginService.login(email, password,role).subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/dashboard/admin']);
        } else {
          this.loginError = response.message;
          this.router.navigate(['/dashboard/seller']);
        }
      });
    }
  }


}
