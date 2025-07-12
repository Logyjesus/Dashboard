import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone :true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
 @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(page: number) {
    if (page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}