import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private uploadedImage: string = ''; // تخزين مسار الصورة أو بياناتها

  setImage(image: string): void {
    this.uploadedImage = image;
  }

  getImage(): string {
    return this.uploadedImage;
  }
}
