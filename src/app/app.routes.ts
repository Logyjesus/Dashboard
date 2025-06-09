import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { SellerComponent } from './component/dashboard/seller/seller.component';
import { RegisterComponent } from './component/auth/register/register.component';
// import { AddProductComponent } from './component/dashboard/seller/add-product/add-product.component';
import { MyProductsComponent } from './component/dashboard/seller/my-products/my-products.component';
import { OrdersComponent } from './component/dashboard/seller/orders/orders.component';
import { DisplayComponent } from './folder_imageupload/display/display.component';
import { UploadComponent } from './folder_imageupload/upload/upload.component';
import { StatisticsComponent } from './component/dashboard/seller/pages/statistics/statistics.component';
import { AddSellerComponent } from './component/dashboard/admin/add-seller/add-seller.component';
import { ProductSellerComponent } from './component/dashboard/admin/product-seller/product-seller.component';
import { CategoryFormComponent } from './component/dashboard/seller/category-form/category-form.component';
import { CategoryComponent } from './component/dashboard/seller/category/category.component';
import { SubCategoryComponent } from './component/dashboard/seller/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './component/dashboard/seller/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './component/dashboard/seller/edit-sub-category/edit-sub-category.component';
import { OrdersListComponent } from './component/dashboard/seller/orders-list/orders-list.component';
import { OrderDetailsComponent } from './component/dashboard/seller/order-details/order-details.component';
import { UsersComponent } from './component/user/users/users.component';
import { UserFormComponent } from './component/user/user-form/user-form.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';
import { DellerFormComponent } from './component/dashboard/seller/sellers/deller-form/deller-form.component';
import { SellerEditComponent } from './component/dashboard/seller/sellers/seller-edit/seller-edit.component';
import { SellerDetailsComponent } from './component/dashboard/seller/sellers/seller-details/seller-details.component';
import { AdminListComponent } from './component/dashboard/admin/admin-list/admin-list.component';
import { AdminCreateComponent } from './component/dashboard/admin-create/admin-create.component';
import { EditAdminComponent } from './component/dashboard/admin/edit-admin/edit-admin.component';
import { AdminDetailaComponent } from './component/dashboard/admin/admin-detaila/admin-detaila.component';
// import { UpdateProductComponent } from './component/dashboard/seller/update-product/update-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/admin', component: AdminComponent },
  { path: 'dashboard/seller', component: SellerComponent },
  //sellers
  { path: 'sellers', component: SellerComponent },
  { path: 'sellers/new', component: DellerFormComponent },
  { path: 'sellers/edit/:slug', component: SellerEditComponent },
  { path: 'sellers/:slug', component: SellerDetailsComponent },
  // Admins 
  { path: 'Admins', component: AdminListComponent },
  { path: 'admin/new', component: AdminCreateComponent },
  { path: 'admin/edit/:slug', component: EditAdminComponent },
  { path: 'admin/:slug', component: AdminDetailaComponent },
  // مسار افتراضي

  { path: 'users', component: UsersComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/edit/:slug', component: UserFormComponent },
      { path: 'users/:slug', component: UserDetailsComponent },
  // { path: 'add_product', component: AddProductComponent},
  // { path: 'edit-product/:slug', component: UpdateProductComponent },
  { path: 'product-list' , component: MyProductsComponent},
  {path:'category' , component: CategoryComponent},
  {path :'new-category', component: CategoryFormComponent},
  {path:'edit-category/:slugs', component: CategoryFormComponent},
  { path: 'subcategories', component: SubCategoryComponent },
  { path: 'subcategories/create', component: AddSubCategoryComponent },
  { path: 'subcategories/edit/:slug', component: EditSubCategoryComponent },
  {path: 'orsers',component:OrdersListComponent},
  {path:'orders/:slug',component:OrderDetailsComponent}
  // Add other routes as needed
  // { path: '', redirectTo: '/subcategories', pathMatch: 'full' },
  // { path: 'upload', component: UploadComponent },
  // { path: 'display', component: DisplayComponent },
  // { path: 'order', component: StatisticsComponent},
  // {path : 'add-seller' , component: AddSellerComponent},
  // { path: 'product-seller', component: ProductSellerComponent}
];
