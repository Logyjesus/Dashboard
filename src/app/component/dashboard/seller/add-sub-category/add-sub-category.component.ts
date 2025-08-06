import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { SubCategoryService } from '../../../../service/sub-category.service';
import { CayegoryService } from '../../../../service/cayegory.service';
import { Category } from '../../../../module/category';
import { BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
    MatSnackBarModule,
    MatOptionModule
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
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يرجى تسجيل الدخول أولاً');
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadCategories();
  }

  loadCategories(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    
    this.http.get(`${BASE_URL}/dashboard/categories`, { headers }).subscribe({
      next: (res: any) => {
        this.processCategories(res, '/dashboard/categories');
      },
      error: (err) => {
        this.http.get(`${BASE_URL}/categories`, { headers }).subscribe({
          next: (res: any) => {
            this.processCategories(res, '/categories');
          },
          error: (fallbackErr) => {
            this.categories = [
              { id: 1, name: 'بنات', slug: 'bnat', image: '' },
              { id: 2, name: 'ولاد', slug: 'olad', image: '' },
              { id: 3, name: 'ملابس اولاد', slug: 'mlabs-aolad', image: '' }
            ];
          }
        });
      }
    });
  }

  private processCategories(res: any, source: string): void {
    let categoriesData = [];
    if (Array.isArray(res)) {
      categoriesData = res;
    } else if (res && res.data) {
      categoriesData = res.data;
    } else if (res && res.categories) {
      categoriesData = res.categories;
    }
    
    const categoriesWithIds = categoriesData.filter((cat: any) => 
      cat.id !== undefined && cat.id !== null && Number.isInteger(Number(cat.id))
    );
    const categoriesWithoutIds = categoriesData.filter((cat: any) => 
      cat.id === undefined || cat.id === null || !Number.isInteger(Number(cat.id))
    );
    
    this.categories = [];
    
    categoriesWithIds.forEach((cat: any) => {
      if (cat.name && cat.name.trim() !== '') {
        this.categories.push({
          id: Number(cat.id),
          name: cat.name.trim(),
          slug: cat.slug || '',
          image: cat.image || ''
        });
      }
    });
    
    if (this.categories.length === 0 && categoriesWithoutIds.length > 0) {
      categoriesWithoutIds.forEach((cat: any, index: number) => {
        if (cat.name && cat.name.trim() !== '') {
          this.categories.push({
            id: index + 1,
            name: cat.name.trim(),
            slug: cat.slug || '',
            image: cat.image || ''
          });
        }
      });
    }
    
    if (this.categories.length === 0) {
      this.categories = [
        { id: 1, name: 'بنات', slug: 'bnat', image: '' },
        { id: 2, name: 'ولاد', slug: 'olad', image: '' },
        { id: 3, name: 'ملابس اولاد', slug: 'mlabs-aolad', image: '' }
      ];
    }
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  trackByCategory(index: number, category: any): any {
    return category.id || index;
  }

  resetForm(): void {
    this.form.reset();
    this.imageFile = null;
  }

  private generateSlugFromName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[\u0600-\u06FF]/g, (match) => {
        const arabicToEnglish: { [key: string]: string } = {
          'ا': 'a', 'أ': 'a', 'إ': 'a', 'آ': 'a',
          'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
          'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh',
          'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
          'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z',
          'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
          'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
          'ه': 'h', 'و': 'w', 'ي': 'y', 'ة': 'h',
          ' ': '-'
        };
        return arabicToEnglish[match] || match;
      })
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  submit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.imageFile) {
      alert('⚠️ يرجى اختيار صورة للتصنيف الفرعي');
      return;
    }

    const categoryId = this.form.value.category_id;
    const selectedCategory = this.categories.find(cat => cat.id == categoryId);
    
    if (!selectedCategory) {
      alert('❌ الفئة المختارة غير موجودة. يرجى المحاولة مرة أخرى.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('category_id', categoryId.toString());
    formData.append('category', selectedCategory.name);
    formData.append('slug', this.generateSlugFromName(this.form.value.name));
    formData.append('image', this.imageFile);

    this.subCategoryService.create(formData).subscribe({
      next: (response) => {
        alert('✅ تم إضافة التصنيف الفرعي بنجاح');
        this.router.navigate(['category']);
      },
      error: (err) => {
        if (err.error && err.error.message) {
          alert(`❌ خطأ: ${err.error.message}`);
        } else {
          alert('❌ فشل في إضافة التصنيف الفرعي. تأكد من البيانات المدخلة');
        }
        this.loadCategories();
      },
    });
  }
}
