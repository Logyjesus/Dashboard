import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { SellerComponent } from './component/dashboard/seller/seller.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { AddProductComponent } from './component/dashboard/seller/add-product/add-product.component';
import { MyProductsComponent } from './component/dashboard/seller/my-products/my-products.component';
import { OrdersComponent } from './component/dashboard/seller/orders/orders.component';
import { DisplayComponent } from './folder_imageupload/display/display.component';
import { UploadComponent } from './folder_imageupload/upload/upload.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/admin', component: AdminComponent },
  { path: 'dashboard/seller', component: SellerComponent },
  { path: 'add_product', component: AddProductComponent},
  { path: 'product-list' , component: MyProductsComponent},
  // {path : 'order' , component: OrdersComponent},
  // { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'order', component: OrdersComponent},
];
