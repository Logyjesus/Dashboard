import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubCategoryService } from '../../../../service/sub-category.service';
import { CayegoryService } from '../../../../service/cayegory.service';
import { Category } from '../../../../module/category';

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css'
})
export class AddSubCategoryComponent implements OnInit {
  form: FormGroup;
  imageFile: File | null = null;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private subCategoryService: SubCategoryService,
    private categoryService: CayegoryService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [''],
      category_slug: ['']
    });
  }

  ngOnInit(): void {
    
    this.loadCategories();
  }




 loadCategories(): void {
  this.categoryService.getAll().subscribe({
    next: (res: any) => {
      // جربي تطبعيها للتأكد
      console.log('كل الكاتيجوري:', res);
      this.categories = res?.data || res || [];  // تدعم الشكلين
    },
    error: (err) => {
      console.error('❌ خطأ في تحميل الأقسام:', err);
    }
  });
}


  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit() {
  console.log('بيانات الفورم:', this.form.value);
  const formData = new FormData();
  formData.append('name', this.form.value.name);

  if (this.form.value.category_slug) {
    formData.append('category_slug', this.form.value.category_slug);
  } else {
    console.error('⚠️ لا يوجد category_slug');
  }

  if (this.imageFile) {
    formData.append('image', this.imageFile);
  }

  this.subCategoryService.create(formData).subscribe({
    next: () => {
      alert('✅ تم إضافة التصنيف الفرعي بنجاح');
      this.router.navigate(['category']);
    },
    error: (err) => {
      console.error('❌ خطأ في الإضافة:', err);
    },
  });
}

}
