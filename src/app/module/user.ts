export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    slug?: string;
    password?: string;
    password_confirmation?: string;
}

