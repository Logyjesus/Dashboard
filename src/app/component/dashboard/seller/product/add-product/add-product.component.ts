import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-product',
  standalone:true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  RouterModule,
MatOptionModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
 productForm: FormGroup;
  images: File[] = [];
  imagePreviewUrls: string[] = [];
  categories: any[] = [];
  isLoading = false;
subCategories: any[] = [];
subCategoriesWithoutColors = ['make-up', 'perfume'];
subCategoriesWithoutSizes = ['make-up', 'perfume'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
this.productForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', Validators.required],
  price: [0, [Validators.required, Validators.min(0.01)]],
  discounted_price: [0, Validators.min(0)],
  quantity: [1, [Validators.required, Validators.min(1)]],
  category_slug: ['', Validators.required],
  sub_category_id: [null, Validators.required], // ← عدلناه من slug إلى id
  colors: this.fb.array([]),
  sizes: this.fb.array([])
});


  }

  ngOnInit(): void {
    this.loadCategories();
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

loadCategories(): void {
  this.http.get<any>('http://127.0.0.1:8000/api/categories').subscribe({
    next: (response) => {
      this.categories = Array.isArray(response) ? response : response.data || [];
    },
    error: (err) => {
      console.error('❌ فشل في تحميل الفئات:', err);
    }
  });
}


  // ⭐ إضافة دالة مقارنة للقيم
  compareCategories(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

  addColor(colorInput: HTMLInputElement): void {
    const color = colorInput.value.trim();
    if (color && !this.colors.value.includes(color)) {
      this.colors.push(this.fb.control(color, Validators.required));
      colorInput.value = '';
    }
  }

  removeColor(index: number): void {
    this.colors.removeAt(index);
  }

  addSize(sizeInput: HTMLInputElement): void {
    const size = sizeInput.value.trim();
    if (size && !this.sizes.value.includes(size)) {
      this.sizes.push(this.fb.control(size, Validators.required));
      sizeInput.value = '';
    }
  }

  removeSize(index: number): void {
    this.sizes.removeAt(index);
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      
      // إضافة الصور الجديدة للمصفوفة الموجودة
      this.images = [...this.images, ...newFiles];
      
      // إنشاء معاينة للصور الجديدة
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.imagePreviewUrls.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
      
      // إعادة تعيين قيمة input لتتمكن من اختيار نفس الملف مرة أخرى
      input.value = '';
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.productForm.valid && this.images.length > 0) {
      this.isLoading = true;
      const formData = new FormData();

      // إضافة بيانات النموذج
      Object.entries(this.productForm.value).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val, i) => {
            formData.append(`${key}[${i}]`, val);
          });
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // إضافة الصور
      this.images.forEach((img, i) => {
        formData.append(`images[${i}]`, img, img.name);
      });

      // إرسال البيانات
      this.http.post('http://127.0.0.1:8000/api/dashboard/products', formData).subscribe({
        next: (response) => {
          console.log('✅ تم إنشاء المنتج بنجاح:', response);
              alert('تم إنشاء حساب البائع بنجاح');
          this.productForm.reset();
   
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('❌ خطأ في الإرسال:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.log('❌ النموذج غير صالح أو لا توجد صور');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  // دالة للتحقق من صحة الحقل
  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // دالة للحصول على رسالة الخطأ
  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} مطلوب`;
      if (field.errors['minlength']) return `${fieldName} قصير جداً`;
      if (field.errors['min']) return `${fieldName} يجب أن يكون أكبر من الصفر`;
    }
    return '';
  }

  // دالة للإلغاء والعودة للقائمة
  onCancel(): void {
    this.router.navigate(['/products']);
  }
selectedCategoryFeatures = {
  hasColors: true,
  hasSizes: true
};

  // ⭐ دالة لمتابعة تغيير القيمة
onCategoryChange(slug: string): void {
  const selected = this.categories.find(cat => cat.slug === slug);

  if (selected) {
    this.getSubCategories(slug);

    this.productForm.patchValue({ sub_category_id: null });

  }
}



getSubCategories(slug: string) {
  console.log('🔄 جاري تحميل الأقسام الفرعية لـ:', slug);
  this.http.get(`http://127.0.0.1:8000/api/sub-categories/${slug}`).subscribe({
    next: (res: any) => {
      console.log('✅ الأقسام الفرعية المحملة:', res);
      this.subCategories = Array.isArray(res) ? res : res.data || [];
    },
    error: (err) => {
      console.error('❌ فشل في تحميل sub-categories:', err);
      this.subCategories = [];
    }
  });
}

onSubCategoryChange(selectedId: number): void {
  const sub = this.subCategories.find(s => s.id === selectedId);
  const slug = sub?.slug || '';
this.subCategoriesWithoutColors.map(s => s.toLowerCase()).includes(slug.toLowerCase())

  console.log('✅ القسم الفرعي المحدد:', slug); // تأكدي من القيمة

  this.selectedCategoryFeatures = {
    hasColors: !this.subCategoriesWithoutColors.includes(slug),
    hasSizes: !this.subCategoriesWithoutSizes.includes(slug)
  };
  console.log('🔍 subCategories:', this.subCategories);
console.log('🚫 should hide colors if in list:', this.subCategoriesWithoutColors.includes(slug));

}




}

