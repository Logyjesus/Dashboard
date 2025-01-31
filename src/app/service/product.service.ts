import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: any[] = []; // مصفوفة لتخزين المنتجات

  constructor() {}
  //  private apiUrl = 'https://your-api-endpoint.com/products'; // عدّل الـ API حسب مشروعك

  // constructor(private http: HttpClient) {}

  // addProduct(productData: FormData): Observable<any> { // تأكد من إرجاع Observable
  //   return this.http.post<any>(this.apiUrl, productData);
  // }

  // إضافة منتج جديد
  addProduct(product: any): void {
    this.products.push(product);
  }

  // جلب جميع المنتجات
  getProducts(): any[] {
    return this.products;
  }


}
