import { Component } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-display',
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
  imageSrc: string | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageSrc = this.imageService.getImage();
  }
}
