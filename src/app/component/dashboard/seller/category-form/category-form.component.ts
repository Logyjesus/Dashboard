import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../module/category';
import { CayegoryService } from '../../../../service/cayegory.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,FormsModule,
  MatProgressSpinnerModule,
RouterModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private categoryService: CayegoryService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
  
    });
  }

onImageChange(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    // تحقق من الحجم (مثال: 2MB = 2 * 1024 * 1024)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('🚫 حجم الصورة كبير جدًا. الحد الأقصى هو 2 ميجا.');
      return;
    }

    this.form.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('image', this.form.value.image);


  this.categoryService.create(formData).subscribe({
  next: (res) => {
    console.log('✅ تم الرد:', res);
          alert('✅ تم إضافة التصنيف الفرعي بنجاح');
    this.router.navigate(['/category']);
  },
  error: (err) => {
    console.error('❌ فشل الإنشاء:', err);
    this.loading = false;
    alert('فشل رفع القسم. قد تكون الصورة كبيرة أو هناك خطأ من السيرفر.');
  }
});
  }
}