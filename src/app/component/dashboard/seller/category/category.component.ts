import { Component, OnInit} from '@angular/core';
import { Category } from '../../../../module/category';
import { CayegoryService } from '../../../../service/cayegory.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../service/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NavbarAdminComponent } from "../../admin/navbar-admin/navbar-admin.component";


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, FormsModule, CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, NavbarAdminComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
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


// التحديث
updateCategory() {
  if (!this.slug) return;

  const formData = new FormData();

  console.log('📛 category.name:', this.category.name);
  console.log('🖼️ selectedImageFile:', this.selectedImageFile);

  if (!this.category.name || this.category.name.trim() === '') {
    alert("❗ من فضلك أدخل اسم القسم");
    return;
  }

  formData.append('name', this.category.name.trim());

  if (this.selectedImageFile) {
    formData.append('image', this.selectedImageFile);
  } else {
    alert("❗ من فضلك اختر صورة جديدة للقسم");
    return;
  }

  this.http.patch(`http://127.0.0.1:8000/api/dashboard/categories/${this.slug}`, formData).subscribe({
    next: (res) => {
      console.log('✅ تم التحديث بنجاح');
      this.loadCategories();
      this.slug = null;
      this.category = {};
      this.selectedImageFile = null;
    },
    error: (err) => {
      console.error('❌ خطأ في التحديث:', err);
    }
  });
}







  ngOnInit(): void {
    this.loadCategories();
  }

  // loadCategories(): void {
  //   this.categoryService.getAll().subscribe({
  //     next: (data) => {
        
  //       this.categories = data;
       
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error('❌ خطأ في تحميل الأقسام', err);
  //       this.loading = false;
  //     }
  //   });
  // }
  loadCategories(): void {
    this.http.get('http://127.0.0.1:8000/api/categories').subscribe((res: any) => {
      const cats = Array.isArray(res) ? res : res.data || res.categories || [];

      // بعد تحميل الكاتيجوري، نجيب لكل واحد السب كاتيجوري
      cats.forEach((cat: any) => {
        this.http.get(`http://127.0.0.1:8000/api/dashboard/sub-categories/${cat.slug}`)
          .subscribe((subs: any) => {
            cat.subCategories = subs; // أضفنا السب كاتيجوري للكائن
          });
      });

      this.categories = cats;
    });
  }




  deleteCategory(slug: string): void {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      this.categoryService.delete(slug).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error('❌ خطأ أثناء الحذف', err)
      });
    }
  }
deleteSubCategory(categorySlug: string, subSlug: string): void {
  if (confirm('هل أنت متأكد من حذف هذا التصنيف الفرعي؟')) {
    this.http.delete(`http://127.0.0.1:8000/api/dashboard/sub-categories/${subSlug}`).subscribe({
      next: () => {
        // بعد الحذف، نعيد تحميل السب كاتيجوري
        this.http.get(`http://127.0.0.1:8000/api/dashboard/sub-categories/${categorySlug}`)
          .subscribe((subs: any) => {
            const category = this.categories.find(cat => cat.slug === categorySlug);
            if (category) {
              category.subCategories = subs;
            }
          });
      },
      error: (err) => {
        console.error('❌ فشل حذف التصنيف الفرعي:', err);
      }
    });
  }
}

  goToCreate(): void {
    this.router.navigate(['/new-category']);
  }

}
