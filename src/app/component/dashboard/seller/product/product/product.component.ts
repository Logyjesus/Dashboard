import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { NavBarSellerComponent } from '../../nav-bar-seller/nav-bar-seller.component';
import { BASE_URL } from '../../../../../constants';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule,FormsModule,NavBarSellerComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';
  imageUrls: { [key: string]: SafeUrl[] } = {}; // تخزين URLs الصور
currentPage: number = 1;
totalPages: number = 1;
perPage: number = 10;
  constructor(
    private http: HttpClient, 
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    
  }
  

  get filteredProducts(): any[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

 getAllProducts(page: number = 1): void {
  this.http.get(`${BASE_URL}/dashboard/products?page=${page}`).subscribe({
    next: (res: any) => {
      console.log('🔍 API Response:', res);
      
      this.products = res.products.map((product: any) => {
        return {
          ...product,
          images: Array.isArray(product.images) ? product.images : product.images ? [product.images] : []
        };
      });

      this.products.forEach(product => {
        this.convertImagesToUrls(product);
      });

      // تحديث بيانات التقسيم
      if (res.pagination) {
        this.currentPage = res.pagination.current_page;
        this.totalPages = Math.ceil(res.pagination.total / res.pagination.per_page);
        this.perPage = res.pagination.per_page;
      }
    },
    error: (err) => {
      console.error('❌ فشل في تحميل المنتجات:', err);
    }
  });
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.getAllProducts(page);
  }
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.goToPage(this.currentPage + 1);
  }
}

previousPage(): void {
  if (this.currentPage > 1) {
    this.goToPage(this.currentPage - 1);
  }
}


  // تحويل الصور المرفوعة كـ files إلى URLs
convertImagesToUrls(product: any): void {
  const urls: SafeUrl[] = [];

  if (Array.isArray(product.images)) {
    product.images.forEach((image: any, index: number) => {
      console.log(`🖼️ الصورة ${index + 1}:`, image);
      if (image.image_path) {
        console.log(`✅ تم العثور على image_path: ${image.image_path}`);
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(image.image_path);
        urls.push(safeUrl);
      }
    });
  }

  // ✨ احفظ الصور في imageUrls باستخدام ID المنتج كمفتاح
  this.imageUrls[product.id] = urls;
}




  deleteProduct(slug: string): void {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      this.http.delete(`${BASE_URL}/dashboard/products/${slug}`).subscribe({
        next: () => {
          alert('✅ تم حذف المنتج بنجاح');
          // إعادة تحميل المنتجات مع الحفاظ على الصفحة الحالية
          this.getAllProducts(this.currentPage);
        },
        error: (err) => {
          console.error('❌ فشل في حذف المنتج:', err);
          alert('❌ فشل في حذف المنتج. حاول مرة أخرى.');
        }
      });
    }
  }

  editProduct(product: any): void {
    console.log('🔍 المنتج اللي هيتم تعديله:', product);
    this.router.navigate(['/dashboard/products/edit', product.slug]);
  }

  goToAdd(): void {
    this.router.navigate(['/dashboard/products/new']);
  }

  // الحصول على أول صورة
  getFirstImageUrl(product: any): SafeUrl {
    const urls = this.imageUrls[product.id];
    if (urls && urls.length > 0) {
      return urls[0];
    }
    return this.sanitizer.bypassSecurityTrustUrl('assets/default-product.jpg');
  }

  // الحصول على جميع الصور
  getAllImageUrls(product: any): SafeUrl[] {
    return this.imageUrls[product.id] || [];
  }

  // تنظيف الـ URLs عند تدمير الكومبوننت
  ngOnDestroy(): void {
    // تحرير الذاكرة من الـ object URLs
    Object.values(this.imageUrls).forEach(urls => {
      urls.forEach(url => {
        if (typeof url === 'string' && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    });
  }
}