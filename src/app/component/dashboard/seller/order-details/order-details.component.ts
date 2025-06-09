import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderStatus } from '../../../../module/order';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  private apiService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  orderSlug: string | null = null;
  order: Order | null = null;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Status update
  newStatus: OrderStatus = 'processing';
  statusUpdated = false;
  isUpdating = false;

  // Delete order
  showDeleteModal = false;
  isDeleting = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderSlug = params.get('slug');
      if (this.orderSlug) {
        this.loadOrderDetails(this.orderSlug);
      }
    });
  }

  loadOrderDetails(slug: string): void {
    this.isLoading = true;
    this.apiService.getOrderDetails(slug).subscribe({
      next: (order) => {
        this.order = order;
        this.newStatus = order.status as OrderStatus;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details. Please try again.';
        this.isLoading = false;
        console.error('Error loading order details:', err);
      }
    });
  }

  statusChanged(): void {
    if (this.order && this.newStatus !== this.order.status) {
      this.statusUpdated = true;
    } else {
      this.statusUpdated = false;
    }
  }

  updateOrderStatus(): void {
    if (!this.orderSlug || !this.order) return;

    this.isUpdating = true;
    this.apiService.updateOrderStatus(this.orderSlug, this.newStatus).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
        this.statusUpdated = false;
        this.successMessage = `Order status updated to ${updatedOrder.status}`;
        this.isUpdating = false;

        // Clear success message after a few seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        this.error = 'Failed to update order status. Please try again.';
        this.isUpdating = false;
        console.error('Error updating order status:', err);

        // Clear error message after a few seconds
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    });
  }

  // Delete Order Methods
  openDeleteConfirmModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteModal = false;
  }

  deleteOrder(): void {
    if (!this.orderSlug) return;

    this.isDeleting = true;
    this.apiService.deleteOrder(this.orderSlug).subscribe({
      next: (response) => {
        this.successMessage = response.message || `Order successfully deleted`;
        this.isDeleting = false;
        this.closeDeleteConfirmModal();

        // Navigate back to orders list after successful deletion
        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Failed to delete order. Please try again.';
        this.isDeleting = false;
        console.error('Error deleting order:', err);

        // Clear error message after a few seconds
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }
}

