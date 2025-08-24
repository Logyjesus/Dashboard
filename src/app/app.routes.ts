import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';

// Admin
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { AdminListComponent } from './component/dashboard/admin/admin-list/admin-list.component';
import { AdminCreateComponent } from './component/dashboard/admin-create/admin-create.component';
import { EditAdminComponent } from './component/dashboard/admin/edit-admin/edit-admin.component';
import { AdminDetailaComponent } from './component/dashboard/admin/admin-detaila/admin-detaila.component';

// Seller
import { SellerComponent } from './component/dashboard/seller/seller.component';
import { SellerssComponent } from './component/dashboard/seller/sellers/sellers.component';
import { DellerFormComponent } from './component/dashboard/seller/sellers/deller-form/deller-form.component';
import { SellerEditComponent } from './component/dashboard/seller/sellers/seller-edit/seller-edit.component';
import { SellerDetailsComponent } from './component/dashboard/seller/sellers/seller-details/seller-details.component';

// Users
import { UsersComponent } from './component/user/users/users.component';
import { UserFormComponent } from './component/user/user-form/user-form.component';
import { UserDetailsComponent } from './component/user/user-details/user-details.component';
import { UserEditComponent } from './component/user/user-edit/user-edit.component';

// Categories
import { CategoryComponent } from './component/dashboard/seller/category/category.component';
import { CategoryFormComponent } from './component/dashboard/seller/category-form/category-form.component';
import { CategoryEditComponent } from './component/dashboard/seller/category-edit/category-edit.component';

// Sub Categories
import { SubCategoryComponent } from './component/dashboard/seller/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './component/dashboard/seller/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './component/dashboard/seller/edit-sub-category/edit-sub-category.component';

// Products
import { ProductComponent } from './component/dashboard/seller/product/product/product.component';
import { AddProductComponent } from './component/dashboard/seller/product/add-product/add-product.component';
import { EditProductComponent } from './component/dashboard/seller/product/edit-product/edit-product.component';

// Orders
import { OrderComponent } from './component/dashboard/orders/order/order.component';
import { OrderDetailsComponent } from './component/dashboard/orders/order-details.component';
import { EditOrderComponent } from './component/dashboard/orders/edit-order/edit-order.component';

// Guards
import { roleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { SellerCategoryComponent } from './component/dashboard/seller/seller-category/seller-category.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Dashboard
  { path: 'dashboard/admin', component: AdminComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'dashboard/seller', component: SellerComponent, canActivate: [roleGuard], data: { roles: ['seller'] } },

  // Sellers (Admins only)
  { path: 'sellers', component: SellerssComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'sellers/new', component: DellerFormComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'sellers/edit/:slug', component: SellerEditComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'sellers/:slug', component: SellerDetailsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

  // Admins (Admins only)
  { path: 'Admins', component: AdminListComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/new', component: AdminCreateComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/edit/:slug', component: EditAdminComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/:slug', component: AdminDetailaComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

  // Users (Admins only)
  { path: 'users', component: UsersComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'users/new', component: UserFormComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'users/edit/:slug', component: UserEditComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'users/:slug', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

  // Categories (Admin only create , privew seller)
  { path: 'seller-category', component: SellerCategoryComponent, canActivate: [roleGuard], data: { roles: ['seller'] } },
  { path: 'category', component: CategoryComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'new-category', component: CategoryFormComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'edit-category/:slug', component: CategoryEditComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

  // Sub Categories (Admin only create , privew seller)
  { path: 'subcategories', component: SubCategoryComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'subcategories/create', component: AddSubCategoryComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },
  { path: 'subcategories/edit/:slug', component: EditSubCategoryComponent, canActivate: [roleGuard], data: { roles: ['admin'] } },

  // Products (Sellers & Admin)
  { path: 'products', component: ProductComponent, canActivate: [roleGuard], data: { roles: ['admin','seller'] } },
  { path: 'dashboard/products/new', component: AddProductComponent, canActivate: [roleGuard], data: { roles: ['admin','seller'] } },
  { path: 'dashboard/products/edit/:slug', component: EditProductComponent, canActivate: [roleGuard], data: { roles: ['admin','seller'] } },

  // Orders (Admins & Sellers allowed)
  { path: 'orders', component: OrderComponent, canActivate: [roleGuard], data: { roles: ['admin', 'seller'] } },
  { path: 'orders/:slug', component: OrderDetailsComponent, canActivate: [roleGuard], data: { roles: ['admin', 'seller'] } },
  { path: 'orders/:slug/edit', component: EditOrderComponent, canActivate: [roleGuard], data: { roles: ['admin', 'seller'] } },
  { path: 'unauthorized', component: UnauthorizedComponent }


];
