import { Component} from '@angular/core';
import { Category } from '../../../../module/category';
import { CayegoryService } from '../../../../service/cayegory.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories : Category[] = [];
  constructor(private categoryService : CayegoryService){}

  ngOnInit():void{
    this.categoryService.getCategories().subscribe(data =>
      {
        this.categories = data;
      });
  }

  deleteCategory(slug:string):void{
    if(confirm("Are you sure you want to delete this category")){
      this.categoryService.deleteCategory(slug).subscribe(()=>
      {
        this.categories = this.categories.filter(category=> category.slug !== slug);
      } , );
    }
  }

  }

