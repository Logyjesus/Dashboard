import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatOptionModule,
    MatCardModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product = {
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    discounted_price: 0,
    sub_category_slug: '',
    colors: [] as string[],
    sizes: [] as string[]
  };

  slug: string = '';
  loading: boolean = false;
  categories: any[] = [];
  subCategories: any[] = [];
  selectedCategorySlug: string = '';
  newColor = '';
  newSize = '';
hasSizes: boolean = true;
hasColors: boolean = true;

// الأقسام اللي ما تحتاجش ألوان ومقاسات
noColorSizeCategories = ['make-up', 'perfume'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.loadProduct();
    this.loadCategories();
  }

loadCategories() {
  this.http.get<any[]>('http://127.0.0.1:8000/api/categories').subscribe({
    next: (res) => {
      console.log('📦 الفئات الرئيسية:', res);
      this.categories = res;
    },
    error: (err) => {
      console.error('❌ فشل تحميل الفئات:', err);
    }
  });
}



getSubCategories(slug: string) {
  this.http.get(`http://127.0.0.1:8000/api/sub-categories/${slug}`).subscribe({
    next: (res: any) => {
      console.log('📦 الفئات الفرعية:', res);
      this.subCategories = Array.isArray(res) ? res : res.data || [];
    },
    error: (err) => {
      console.error('❌ فشل تحميل الأقسام الفرعية:', err);
      this.subCategories = [];
    }
  });
}

onSubCategoryChange(slug: string): void {
  const sub = this.subCategories.find(s => s.slug === slug);
  if (sub && sub.category) {
    const subSlug = sub.slug.toLowerCase();  // تأكيد lowercase
    const excludedSlugs = ['make-up', 'perfume'];

    this.hasColors = !excludedSlugs.includes(subSlug);
    this.hasSizes = !excludedSlugs.includes(subSlug);

    if (!this.hasColors) {
      this.product.colors = [];
    }

    if (!this.hasSizes) {
      this.product.sizes = [];
    }

    // لو محتاج تطبع النتيجة
    console.log('🎯 subSlug:', subSlug, ' | hasColors:', this.hasColors, ' | hasSizes:', this.hasSizes);
  }
}

onCategoryChange(): void {
  this.getSubCategories(this.selectedCategorySlug);

  // تحقق إذا القسم لا يحتاج ألوان أو مقاسات
  this.hasColors = !this.noColorSizeCategories.includes(this.selectedCategorySlug);
  this.hasSizes = !this.noColorSizeCategories.includes(this.selectedCategorySlug);

  // لو مش محتاجينهم، نفرغهم
  if (!this.hasColors) this.product.colors = [];
  if (!this.hasSizes) this.product.sizes = [];
}



loadProduct(): void {
  this.loading = true;
  this.http.get(`http://127.0.0.1:8000/api/dashboard/products/${this.slug}`).subscribe({
    next: (data: any) => {
      // 1. تحميل المنتج
      this.product = {
        name: data.name || '',
        price: data.price || 0,
        quantity: data.quantity || 0,
        description: data.description || '',
        sub_category_slug: data.sub_category_slug || '',
        discounted_price: data.discounted_price || 0,
        colors: (data.colors || []).map((c: any) => typeof c === 'string' ? c : c.name || c.color || ''),
        sizes: (data.sizes || []).map((s: any) => typeof s === 'string' ? s : s.name || s.size || '')
      };

      // 2. نجيب القسم الفرعي
      if (this.product.sub_category_slug) {
        this.http.get(`http://127.0.0.1:8000/api/dashboard/sub-categories/${this.product.sub_category_slug}`).subscribe({
          next: (sub: any) => {
            // 3. نحفظ القسم الرئيسي
            this.selectedCategorySlug = sub.category_slug;

            // 4. نحمل الأقسام الفرعية المرتبطة به
            this.getSubCategories(this.selectedCategorySlug);

            // 5. نحدث العرض بناءً على النوع
            this.onSubCategoryChange(this.product.sub_category_slug);
          },
          error: (err) => {
            console.error('❌ فشل في جلب بيانات القسم الفرعي:', err);
          }
        });
      }

      this.loading = false;
    },
    error: () => {
      alert('❌ فشل في تحميل المنتج');
      this.router.navigate(['/Products']);
    }
  });
}

  addColor() {
    if (this.newColor.trim()) {
      this.product.colors.push(this.newColor.trim());
      this.newColor = '';
    }
  }

  removeColor(index: number) {
    this.product.colors.splice(index, 1);
  }
  cancelEdit(): void {
  this.router.navigate(['/products']);
}

  addSize() {
    if (this.newSize.trim()) {
      this.product.sizes.push(this.newSize.trim());
      this.newSize = '';
    }
  }

  removeSize(index: number) {
    this.product.sizes.splice(index, 1);
  }

updateProduct(): void {
  const selectedSubCategory = this.subCategories.find(
    sub => sub.slug === this.product.sub_category_slug
  );

  if (!selectedSubCategory) {
    alert('❌ يجب اختيار قسم فرعي صحيح');
    return;
  }

  const data: any = { ...this.product };
  data.sub_category_id = selectedSubCategory.id;
  delete data.sub_category_slug;

  // ✨ شرط: لو القسم لا يتطلب ألوان أو مقاسات، لا ترسلهم نهائيًا
  if (!this.hasColors) {
    delete data.colors;
  } else if (!data.colors || data.colors.length === 0) {
    alert('❌ يجب إضافة لون واحد على الأقل');
    return;
  }

  if (!this.hasSizes) {
    delete data.sizes;
  } else if (!data.sizes || data.sizes.length === 0) {
    alert('❌ يجب إضافة مقاس واحد على الأقل');
    return;
  }

  this.http.patch(`http://127.0.0.1:8000/api/dashboard/products/${this.slug}`, data).subscribe({
    next: () => {
      alert('✅ تم تحديث المنتج بنجاح');
      this.router.navigate(['/Products']);
    },
    error: (err) => {
      console.error('❌ خطأ أثناء التحديث:', err);
      const errorList = err?.error?.errors ? Object.values(err.error.errors).flat() : [];
      alert('❌ فشل التحديث:\n' + errorList.join('\n'));
    }
  });
}



}
