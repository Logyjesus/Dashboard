import { Component } from '@angular/core';
import { ProductService } from '../../../../service/product.service';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../../../folder_imageupload/image.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-products',
  imports: [FormsModule , RouterModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  products: any[] = []; // مصفوفة لتخزين المنتجات المسترجعة
  productToEdit: any = null; // المتغير الخاص بتخزين المنتج الذي سيتم تعديله
  selectedProduct: any = null;
  imageSrc: string | null = null;


  constructor(private productService: ProductService ,private imageService: ImageService) {}

  ngOnInit(): void {
    // جلب المنتجات من الخدمة
    this.products = this.productService.getProducts();
        this.imageSrc = this.imageService.getImage();

  }

  // دالة الحذف
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this Product?')) {
      this.products = this.products.filter(product => product.id !== productId);
    }
  }

  // دالة التعديل
  editProduct(product: any) {
    this.productToEdit = { ...product }; // حفظ نسخة من المنتج الذي سيتم تعديله
  }

  // دالة حفظ التعديلات
  saveEdit() {
    const index = this.products.findIndex(p => p.id === this.productToEdit.id);
    if (index !== -1) {
      this.products[index] = { ...this.productToEdit }; // تحديث المنتج في المصفوفة
    }
    this.productToEdit = null; // إغلاق نافذة التعديل
  }
 // دالة لعرض تفاصيل المنتج
 viewDetails(product: any) {
  this.selectedProduct = product; // تعيين المنتج المختار لعرض التفاصيل
  alert(`Details of ${product.name}: \n${product.description}`); // مثال بسيط باستخدام alert
}
increaseQuantity(product: any) {
  if (product.quantity >= 0){
  product.quantity +=1;}
}

decreaseQuantity(product: any) {
  if (product.quantity > 0) {
    product.quantity -= 1;
  }
}



  // دالة لإغلاق الـ modal
  closeModal() {
    this.productToEdit = null;
  }

  // التتبع عند تكرار المنتجات باستخدام trackBy
  trackProduct(index: number, product: any): number {
    return product.id;
  }
}
