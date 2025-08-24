export interface Users {
  name: string;
  slug: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  order_item: {
    name: string;
    slug: string;
    description: string;
    price: string;
    discounted_price: string;
    quantity: number;
    images: Array<{
      image_path: string;
    }>;
    colors: Array<{
      color: string;
    }>;
    sizes: Array<{
      size: string;
    }>;
  };
  quantity: number;
  price: string;
}

export interface Order {
  slug: string;
  user: Users;
  total_price: string;
  status: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  orders: Order[];
}

export interface DeleteOrderResponse {
  message: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
