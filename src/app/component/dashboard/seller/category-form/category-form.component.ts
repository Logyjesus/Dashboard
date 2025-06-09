import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../module/category';
import { CayegoryService } from '../../../../service/cayegory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule , RouterModule,CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  category: Category = {} as Category;
  editMode:boolean=false;

  constructor(private categoryService: CayegoryService , private route : ActivatedRoute , private router:Router){}


  ngOnInit(): void {
    const slug=this.route.snapshot.paramMap.get('slug');
    if(slug){
      this.editMode=true;
      this.categoryService.getCategoryBySlug(slug).subscribe(category=> {
        this.category = category;
      });
    }
  }
  onSubmit(): void {
    if(this.editMode){
      this.categoryService.updateCategory(this.category.slug,this.category).subscribe(()=>{
        this.router.navigate(['/category']);
      });
  }
  else
  {
    this.categoryService.createCategory(this.category).subscribe(()=>{
      this.router.navigate(['/category']);
    });
  }
}

}
