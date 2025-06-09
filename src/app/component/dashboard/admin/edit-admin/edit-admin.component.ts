import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  adminForm!: FormGroup;
  slug = '';
  private apiUrl = "http://127.0.0.1:8000/api/dashboard/admins";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.http.get<any>(`${this.apiUrl}/${this.slug}`).subscribe(admin => {
      this.adminForm = this.fb.group({
        name: [admin.name, Validators.required],
        email: [admin.email, [Validators.required, Validators.email]],
        password: [''],
        password_confirmation: ['']
      });
    });
  }

  updateAdmin() {
    if (this.adminForm.valid) {
      this.http.post(`${this.apiUrl}/${this.slug}?_method=PUT`, this.adminForm.value).subscribe(() => {
        this.router.navigate(['/admins']);
      });
    }
  }
}
