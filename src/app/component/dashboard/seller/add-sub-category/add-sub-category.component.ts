import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../../module/category';
import { SubCategoryService } from '../../../../service/sub-category.service';
import { Router } from '@angular/router';
import { CayegoryService } from '../../../../service/cayegory.service';
@Component({
  selector: 'app-add-sub-category',
  imports: [ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css'
})
export class AddSubCategoryComponent {

  subcategoryForm: FormGroup;
  categories: Category[] = [];
  loading = false;
  submitting = false;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubCategoryService,
    private categoryService: CayegoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.subcategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.subcategoryForm.patchValue({ image: file });
      this.subcategoryForm.get('image')?.updateValueAndValidity();

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.subcategoryForm.invalid) {
      return;
    }

    this.submitting = true;
    const formData = new FormData();
    formData.append('name', this.subcategoryForm.get('name')?.value);
    formData.append('category_id', this.subcategoryForm.get('category_id')?.value);
    formData.append('image', this.subcategoryForm.get('image')?.value);

    this.subcategoryService.createSubcategory(formData).subscribe({
      next: () => {
        this.snackBar.open('Subcategory created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/subcategories']);
        this.submitting = false;
      },
      error: (err) => {
        console.error('Error creating subcategory:', err);
        this.snackBar.open('Failed to create subcategory', 'Close', { duration: 3000 });
        this.submitting = false;
      }
    });
  }
}
