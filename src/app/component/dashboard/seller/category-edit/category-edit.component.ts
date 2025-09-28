import { Component } from '@angular/core';
import { CayegoryService } from '../../../../service/cayegory.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../module/category';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category-edit',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,FormsModule,
        MatProgressSpinnerModule,
        RouterModule
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
slug!: string;
  category: any = { name: '', image: '' };
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CayegoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.route.params.subscribe(params => {
    this.slug = params['slug'];
    this.getCategory();
  });

  }

  getCategoryBySlug(slug: string): void {
    this.loading = true;
    this.categoryService.getBySlug(slug).subscribe({
      next: (data) => {
        this.category = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        alert('❌ خطأ أثناء تحميل القسم');
      }
    });
  }

updateCategory(): void {
  if (!this.category.slug) {
    alert('❌ لا يمكن تعديل القسم بدون معرف (slug)');
    return;
  }

  if (!this.category.name) {
    alert('❌ اسم القسم مطلوب');
    return;
  }

  this.loading = true;

  const formData = new FormData();
  formData.append('name', this.category.name);

  // تأكد من إرسال الصورة إذا كانت مطلوبة
  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  } else if (this.category.image) {
    // لو السيرفر يطلب الصورة دائمًا، حتى لو لم يتم تغييرها:
    fetch(this.category.image)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'image.jpg', { type: blob.type });
        formData.append('image', file);

        this.sendUpdate(formData);
      })
      .catch(err => {
        this.loading = false;
        alert('❌ فشل تحميل الصورة الحالية');
        console.error(err);
      });
    return;
  } else {
    alert('❌ يجب اختيار صورة');
    this.loading = false;
    return;
  }

  this.sendUpdate(formData);
}

private sendUpdate(formData: FormData): void {
  this.categoryService.updateCategory(this.category.slug, formData).subscribe({
    next: () => {
      this.loading = false;
      alert('✅ تم تحديث القسم بنجاح');
      this.router.navigate(['/categories']);
    },
    error: (err) => {
      this.loading = false;
      console.error('❌ خطأ في التحديث:', err);
      if (err.error?.errors) {
        alert(Object.values(err.error.errors).flat().join('\n'));
      } else {
        alert('❌ حدث خطأ أثناء التحديث');
      }
    }
  });
}


  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  getCategory(): void {
  this.categoryService.getBySlug(this.slug).subscribe({
    next: (res) => {
      this.category = res;
      this.imagePreview = this.category.image;
    },
    error: (err) => {
      console.error('❌ فشل تحميل القسم:', err);
      alert('⚠️ تعذر تحميل بيانات القسم');
    }
  });
}
}