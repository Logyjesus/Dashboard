import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  imagePreview: string | null = null;

  constructor(private imageService: ImageService, private router: Router) {}

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

  saveImage(): void {
    if (this.imagePreview) {
      this.imageService.setImage(this.imagePreview);
      this.router.navigate(['/display']);
    }
  }
}
