import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../../service/seller.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../service/product.service';
import { Product } from '../../../../module/product';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-sidebar',
  standalone:true,
  imports: [CommonModule,RouterModule , FormsModule],
  templateUrl: './seller-sidebar.component.html',
  styleUrl: './seller-sidebar.component.css'
})
export class SellerSidebarComponent implements OnInit {

  sellers: any[] = [];
  products: Product[] = [];
  sellerProducts: Product[] = [];

  selectedSellerSlug: string | null = null;
  loadingSellers = true;
  loadingProducts = true;
orders: any[] = [];
sellerOrders: any[] = [];
loadingOrders = true;
selectedStatus: string = 'all';

  constructor(
    public http : HttpClient,
    private sellerService: SellerService,
    private productService: ProductService,
      private router: Router
  ) {}
  imgError(event: any) {
  console.error("❌ صورة مش لاقيينها:", event.target.src);
}


  ngOnInit(): void {
    this.fetchSellers();

    this.productService.fetchProducts(); // اجلب كل المنتجات
   this.productService.getProductsObservable().subscribe((allProducts) => {
  console.log("📦 كل المنتجات:", allProducts);
  
this.products = allProducts || [];
  this.loadingProducts = false;

  if (this.selectedSellerSlug) {
    this.filterSellerProducts();
  }
});
this.fetchAllOrders(); // ✅ اجلب كل الطلبات مرة واحدة
  }

  fetchSellers() {
    this.sellerService.getAll().subscribe({
      next: (res: any) => {
        this.sellers = res.sellers || [];
        this.loadingSellers = false;
      },
      error: (err) => {
        console.error('❌ فشل تحميل البائعين:', err);
        this.loadingSellers = false;
      }
    });
  }

  selectSeller(seller: any) {
    this.selectedSellerSlug = seller.slug;
    this.filterSellerProducts();
      this.filterSellerOrders(); 
    
  }
filterSellerProducts() {
  if (!this.selectedSellerSlug) return;

  // نجيب اسم المتجر بتاع البائع المختار
  const selectedSeller = this.sellers.find(s => s.slug === this.selectedSellerSlug);
  if (!selectedSeller) {
    this.sellerProducts = [];
    return;
  }

  const sellerStoreName = selectedSeller.store_name;

  // نفلتر المنتجات حسب اسم المتجر
  this.sellerProducts = this.products.filter(
    p => p.store_name === sellerStoreName
  );

  console.log("🔍 selectedSellerSlug:", this.selectedSellerSlug);
  console.log("🟡 منتجات البائع المحدد:", this.sellerProducts);
}
fetchAllOrders() {
  this.loadingOrders = true;

  // تأكد من صلاحية الـ API العام لجلب جميع الطلبات
  this.sellerService.getAllOrders().subscribe({
    next: (res: any) => {
      this.orders = res.orders || res.data || [];
      this.loadingOrders = false;
      if (this.selectedSellerSlug) {
        this.filterSellerOrders(); // فلترة الطلبات للبائع المحدد
      }
    },
    error: (err) => {
      console.error('❌ فشل تحميل كل الطلبات:', err);
      this.orders = [];
      this.loadingOrders = false;
    }
  });
}
filterSellerOrders() {
  if (!this.selectedSellerSlug) return;

  const selectedSeller = this.sellers.find(s => s.slug === this.selectedSellerSlug);
  if (!selectedSeller) {
    this.sellerOrders = [];
    return;
  }

  const sellerStoreName = selectedSeller.store_name;

  let filtered = this.orders.filter(order =>
    order.order_items?.some((item: any) => item.order_item?.store_name === sellerStoreName)
  );

  if (this.selectedStatus && this.selectedStatus !== 'all') {
    filtered = filtered.filter(order => order.status === this.selectedStatus);
  }

  this.sellerOrders = filtered;

  console.log("📥 الطلبات المفلترة للبائع:", this.sellerOrders);
}




deleteOrder(slug: string) {
  const confirmed = confirm('هل أنت متأكد من حذف الطلب؟');
  if (!confirmed) return;

  this.http.delete(`http://127.0.0.1:8000/api/dashboard/orders/${slug}`).subscribe({
    next: () => {
      this.sellerOrders = this.sellerOrders.filter(o => o.slug !== slug);
      alert('✅ تم حذف الطلب بنجاح');
    },
    error: () => {
      alert('❌ فشل حذف الطلب');
    }
  });
}


}