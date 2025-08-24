import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { SubCategoryService } from '../../../../service/sub-category.service';
import { SubCategory } from '../../../../module/sub-category';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './app-confirm-dialog/app-confirm-dialog.component';

@Component({
  selector: 'app-sub-category',
  imports: [   CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
subCategories: any[] = [];
  loading = true;

  constructor(private subCategoryService: SubCategoryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchSubCategories();
  }

  fetchSubCategories() {
    this.loading = true;
    this.subCategoryService.getAll().subscribe({
      next: (res) => {
        this.subCategories = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ خطأ في تحميل التصنيفات الفرعية:', err);
        this.loading = false;
      },
    });
  }

  deleteSubCategory(slug: string) {
    if (confirm('❗ هل أنت متأكد أنك تريد حذف هذا التصنيف؟')) {
      this.subCategoryService.delete(slug).subscribe({
        next: () => {
          this.subCategories = this.subCategories.filter(sc => sc.slug !== slug);
          this.snackBar.open('✅ تم حذف التصنيف الفرعي بنجاح', 'إغلاق', { duration: 3000 });
        },
        error: (err) => {
          console.error('❌ خطأ أثناء الحذف:', err);
          this.snackBar.open('❌ فشل في حذف التصنيف', 'إغلاق', { duration: 3000 });
        }
      });
    }
  }
}