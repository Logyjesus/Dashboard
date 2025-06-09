export interface Admin {
    id?: number;
    name: string;
    slug?: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
    store_name:string;
    phone : number;
    address:string;
}
