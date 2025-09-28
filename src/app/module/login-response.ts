export interface Seller {
        name: string;
        slug: string;
        email: string;
        role: string;
        store_name: string | null;
        phone: string | null;
        address: string | null;
      }
      
      interface LoginResponse {
        seller: Seller;
        token: string;
      }

