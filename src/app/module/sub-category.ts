import { Category } from "./category";

export interface SubCategory {
  id?: number;           // معرف التصنيف الفرعي
  name: string;
  slug: string;
  image: string;
  category: Category;
  category_id?: number;  // معرف القسم الرئيسي
}