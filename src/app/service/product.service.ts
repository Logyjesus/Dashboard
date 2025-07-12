import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../module/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProduct(slug: string) {
    throw new Error('Method not implemented.');
  }
  getAllProducts() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api/dashboard/products'; // ✅ عدّل هذا حسب API الحقيقي
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  // ✅ جلب المنتجات من الـ API
fetchProducts() {
  this.http.get<any>('http://127.0.0.1:8000/api/dashboard/products').subscribe(
    (res) => {
      this.productsSubject.next(res.products); // 👈 فقط المنتجات
    },
    (err) => {
      console.error('❌ فشل تحميل المنتجات:', err);
      this.productsSubject.next([]);
    }
  );
}


  // ✅ واجهة observable للمنتجات
  getProductsObservable(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  // ✅ حذف منتج من الـ API
  deleteProduct(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }


  getProductBySlug(slug: string) {
    return this.http.get<Product>(`/api/products/${slug}`);
  }


  updateProduct(slug: string, productData: any, images: File[]): Observable<Product> {
    const formData = new FormData();

    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('discounted_price', productData.discounted_price);
    formData.append('quantity', productData.quantity.toString());
    formData.append('sub_category_id', productData.sub_category_id.toString());

    productData.colors.forEach((color: string, index: number) => {
      formData.append(`colors[${index}]`, color);
    });

    productData.sizes.forEach((size: string, index: number) => {
      formData.append(`sizes[${index}]`, size);
    });

    images.forEach(image => {
      formData.append('images[]', image);
    });

    return this.http.patch<Product>(`${this.apiUrl}/${slug}`, formData);
  }

  addProduct(productData: Product): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }
getAll(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

}
