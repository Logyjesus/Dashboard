import { Component } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../../module/product';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css',
})
export class MyProductsComponent {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  productToEdit: Product | null = null;
  selectedProduct: Product | null = null;

  pageSize = 4;
  currentPage = 1;
  totalPages = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProductsFromApi();
  }

  loadProductsFromApi() {
    this.productService.getProductsObservable().subscribe({
      next: (products) => {
        this.products = products;
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.updateDisplayedProducts();
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }
  loadProductBySlug(slug: string) {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.selectedProduct = product;
        this.viewDetails(product);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        alert('Product not found');
      }
    });
  }
  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  deleteProduct(slug: string) {
    if (confirm('Are you sure you want to delete this Product?')) {
      this.productService.deleteProduct(slug).subscribe({
        next: () => {
          this.loadProductsFromApi(); // إعادة التحميل بعد الحذف
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }


  viewDetails(product: Product) {
    this.selectedProduct = product;
    alert(`Details of ${product.name}: \n${product.description}`);
  }

  increaseQuantity(product: Product) {
    product.quantity += 1;
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 0) product.quantity -= 1;
  }

  closeModal() {
    this.productToEdit = null;
  }

  trackProduct(index: number, product: Product): number {
    return index;
  }


  addImage() {
    if (this.productToEdit) {
      this.productToEdit.images.push({ image_path: '' });
    }
  }
  
  removeImage(index: number) {
    if (this.productToEdit) {
      this.productToEdit.images.splice(index, 1);
    }
  }
  
  addColor() {
    if (this.productToEdit) {
      this.productToEdit.colors.push({ color: '' });
    }
  }
  
  removeColor(index: number) {
    if (this.productToEdit) {
      this.productToEdit.colors.splice(index, 1);
    }
  }
  
  addSize() {
    if (this.productToEdit) {
      this.productToEdit.sizes.push({ size: '' });
    }
  }
  
  removeSize(index: number) {
    if (this.productToEdit) {
      this.productToEdit.sizes.splice(index, 1);
    }
  }
  
}
