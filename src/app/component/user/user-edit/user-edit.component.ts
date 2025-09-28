import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';
import { User } from '../../../module/user';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  user: User = {
    id : 0,
    name: '',
    slug: '',
    email: '',
    phone: ''
  };
  slug: string = '';
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserBySlug(this.slug).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في تحميل المستخدم', err);
        this.loading = false;
      }
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.slug, this.user).subscribe({
      next: () => {
        alert('✅ تم تعديل المستخدم بنجاح');
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('❌ خطأ أثناء التعديل', err);
        alert('❌ حدث خطأ أثناء التعديل');
      }
    });
  }
    backToList(){
    this.router.navigate(['/users'])
  }
}
