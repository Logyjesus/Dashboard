import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  isEdit = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // 🛠️ إصلاح الخطأ هنا
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      password_confirmation: [''],
    });

    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.isEdit = true;
      this.userService.getUserBySlug(slug).subscribe(user => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      });
    }
  }

  onSubmit(): void {
    const slug = this.route.snapshot.params['slug'];
    const value = this.form.value;

    if (this.isEdit) {
      this.userService.updateUser(slug, value).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(value).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
