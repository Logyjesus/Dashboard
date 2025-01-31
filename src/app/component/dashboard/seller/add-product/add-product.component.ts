import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../service/product.service';
import { ImageService } from '../../../../folder_imageupload/image.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm!: FormGroup;
  selectedCategory: string = '';
  selectedSubcategory: string = '';

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService,private imageService: ImageService) {} // إضافة الخدمة

  ngOnInit(): void {
    // Initialize the form group with validation
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      name: ['', Validators.required],
      id : ['' , Validators.required  ],
      price: ['', Validators.required],
      image : [ File, Validators.required],
      storeName: ['', Validators.required],
      storeAddress: ['', Validators.required],
      quantity : [ , Validators.required],
      discountPrice: [''],
      color: [''],
      size: [''],
      description : [''],



    });
  }

  // Method to handle category change
  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.selectedSubcategory = ''; // Reset subcategory when category changes
    this.productForm.patchValue({
      subcategory: '' // Reset subcategory field
    });
  }

  // Method to handle subcategory change
  onSubcategoryChange(event: any): void {
    this.selectedSubcategory = event.target.value;
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.imagePreview) {
        this.imageService.setImage(this.imagePreview);
        // this.router.navigate(['/product-list']);
      }
      // إرسال المنتج إلى الخدمة
      this.productService.addProduct(this.productForm.value);
      // الانتقال إلى صفحة قائمة المنتجات
      this.router.navigate(['/product-list']);
    } else {
      console.log('Form is invalid');
    }
  }

// jkhkj

 imagePreview: string | null = null;

  // constructor(private imageService: ImageService, private router: Router) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // تحويل الصورة إلى Base64
      };
      reader.readAsDataURL(file);
    }
  }




}
