import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private image: string  =''; // لتخزين مسار الصورة أو بياناتها

  setImage(image: string): void {
    this.image = image;
  }

  getImage(): string {
    return this.image;
  }
}
