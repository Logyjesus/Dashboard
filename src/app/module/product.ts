export interface Product {
    name: string;
    slug: string;
    description: string;
    price: number; 
    discounted_price: number; 
    quantity: number;
    images: { image_path: string }[];
    colors: { color: string }[]; 
    sizes: { size: string }[];   
    sub_category_id : number;
    storeAddress : string;
      store_name?: string; // ✅ أضف هذا السطر لو مش موجود
       seller_slug: string; // ✅ أضف هذه

}

