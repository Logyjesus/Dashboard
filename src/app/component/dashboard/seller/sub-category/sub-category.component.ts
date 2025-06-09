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

subcategories: SubCategory[] = [];
loading = true;
error: string | null = null;

constructor(
  private subcategoryService: SubCategoryService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

ngOnInit(): void {
  this.loadSubcategories();
}

loadSubcategories(): void {
  this.loading = true;
  this.error = null;

this.subcategoryService.getSubcategories().subscribe({
    next: (data) => {
      this.subcategories = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching subcategories:', err);
      this.error = 'Failed to load subcategories. Please try again later.';
      this.loading = false;
    }
  });
}

deleteSubcategory(subcategory: SubCategory): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: {
      title: 'Delete Subcategory',
      message: `Are you sure you want to delete "${subcategory.name}"?`
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loading = true;

      this.subcategoryService.deleteSubcategory(subcategory.slug).subscribe({
        next: () => {
          this.subcategories = this.subcategories.filter(item => item.slug !== subcategory.slug);
          this.snackBar.open('Subcategory deleted successfully', 'Close', { duration: 3000 });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting subcategory:', err);
          this.snackBar.open('Failed to delete subcategory', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  });
}
}
