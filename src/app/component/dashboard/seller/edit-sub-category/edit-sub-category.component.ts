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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Category } from '../../../../module/category';
import { SubCategory } from '../../../../module/sub-category';
import { SubCategoryService } from '../../../../service/sub-category.service';
import { CayegoryService } from '../../../../service/cayegory.service';
@Component({
  selector: 'app-edit-sub-category',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  templateUrl: './edit-sub-category.component.html',
  styleUrl: './edit-sub-category.component.css'
})
export class EditSubCategoryComponent {
  subcategoryForm: FormGroup;
  categories: Category[] = [];
  loading = true;
  submitting = false;
  imagePreview: string | null = null;
  subcategorySlug: string = '';
  subcategory: SubCategory | null = null;

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubCategoryService,
    private categoryService: CayegoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subcategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.subcategorySlug = this.route.snapshot.paramMap.get('slug') || '';
    if (!this.subcategorySlug) {
      this.snackBar.open('Subcategory not found', 'Close', { duration: 3000 });
      this.router.navigate(['/subcategories']);
      return;
    }

    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Load categories first
    this.categoryService.getCategories().pipe(
      switchMap(categories => {
        this.categories = categories;

        // Then load the subcategory details
        return this.subcategoryService.getSubcategory(this.subcategorySlug);

      }),
      catchError(error => {
        console.error('Error loading data:', error);
        this.snackBar.open('Failed to load subcategory details', 'Close', { duration: 3000 });
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(subcategory => {
      if (subcategory) {
        this.subcategory = subcategory;
        this.populateForm(subcategory);
        this.imagePreview = subcategory.image;
      }

    });
  }

  populateForm(subcategory: SubCategory): void {
    this.subcategoryForm.patchValue({
      name: subcategory.name,
      category_id: subcategory.category.slug || '1' // Assuming category_id is required as a string
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

    // Only append image if a new one was selected
    if (this.subcategoryForm.get('image')?.value) {
      formData.append('image', this.subcategoryForm.get('image')?.value);
    }

    this.subcategoryService.updateSubcategory(this.subcategorySlug, formData).pipe(
      catchError(error => {
        console.error('Error updating subcategory:', error);
        this.snackBar.open('Failed to update subcategory', 'Close', { duration: 3000 });
        return of(null);
      }),
      finalize(() => {
        this.submitting = false;
      })
    ).subscribe(result => {
      if (result) {
        this.snackBar.open('Subcategory updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/subcategories']);
      }
    });
  }
}
