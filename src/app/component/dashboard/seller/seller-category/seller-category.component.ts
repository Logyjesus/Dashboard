import { Component } from '@angular/core';
import { CayegoryService } from '../../../../service/cayegory.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NavBarSellerComponent } from '../nav-bar-seller/nav-bar-seller.component';

@Component({
  selector: 'app-seller-category',
  standalone :true,
  imports: [CommonModule,RouterModule,
       ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, FormsModule, CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NavBarSellerComponent,
    RouterModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './seller-category.component.html',
  styleUrl: './seller-category.component.css'
})
export class SellerCategoryComponent {
 // أعلى الكلاس
category: any = {};  // يحتوي على name و image
slug: string | null = null;
selectedImageFile: File | null = null;
categories: any[] = [];
loading = false;
  constructor(private categoryService: CayegoryService, private router: Router, private auth: AuthService,private http : HttpClient) {}

// عند اختيار تعديل قسم
goToEdit(category: any) {
  this.category = { ...category };
  this.slug = category.slug;
}

// عند اختيار صورة جديدة
onImageChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedImageFile = file;
  }
}
getAllCategories() {
  this.loading = true;
  this.categoryService.getAll().subscribe({
    next: (res) => {
      this.categories = res; // حسب شكل الـ API لديك
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ فشل في تحميل الأقسام:', err);
      this.loading = false;
    }
  });
}


  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories(): void {
    this.http.get('http://127.0.0.1:8000/api/categories').subscribe((res: any) => {
      const cats = Array.isArray(res) ? res : res.data || res.categories || [];
      this.categories = cats;
    });
  }



}


