export interface seller {
// models/seller.model.ts
id: number;
  name: string;
  email: string;
  // أي بيانات أخرى
}

// models/order.model.ts
export interface Order {
  id: number;
  customer_name: string;
  product_name: string;
  seller_name: string;
  order_date: string;
}

// models/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
