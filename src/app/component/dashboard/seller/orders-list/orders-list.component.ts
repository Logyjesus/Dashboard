import { Component, inject } from '@angular/core';
import { Order, OrderStatus } from '../../../../module/order';
import { OrderService } from '../../../../service/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  private apiService = inject(OrderService);
  orders: Order[] = [];
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Status update modal
  showStatusModal = false;
  selectedOrder: Order | null = null;
  newStatus: OrderStatus = 'processing';
  isUpdating = false;

  // Delete modal
  showDeleteModal = false;
  isDeleting = false;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.apiService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response.orders;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orders. Please try again.';
        this.isLoading = false;
        console.error('Error loading orders:', err);
      }
    });
  }

  // Status Update Methods
  openUpdateStatusModal(order: Order): void {
    this.selectedOrder = order;
    this.newStatus = order.status as OrderStatus;
    this.showStatusModal = true;
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedOrder = null;
  }

  updateOrderStatus(): void {
    if (!this.selectedOrder) return;

    this.isUpdating = true;
    this.apiService.updateOrderStatus(this.selectedOrder.slug, this.newStatus).subscribe({
      next: (updatedOrder) => {
        // Update the order in the list
        const index = this.orders.findIndex(o => o.slug === updatedOrder.slug);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }

        this.successMessage = `Order ${updatedOrder.slug} status updated to ${updatedOrder.status}`;
        this.isUpdating = false;
        this.closeStatusModal();

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
  openDeleteConfirmModal(order: Order): void {
    this.selectedOrder = order;
    this.showDeleteModal = true;
  }

  closeDeleteConfirmModal(): void {
    this.showDeleteModal = false;
    this.selectedOrder = null;
  }

  deleteOrder(): void {
    if (!this.selectedOrder) return;

    this.isDeleting = true;
    this.apiService.deleteOrder(this.selectedOrder.slug).subscribe({
      next: (response) => {
        // Remove the order from the list
        this.orders = this.orders.filter(o => o.slug !== this.selectedOrder?.slug);

        this.successMessage = response.message || `Order ${this.selectedOrder?.slug} successfully deleted`;
        this.isDeleting = false;
        this.closeDeleteConfirmModal();

        // Clear success message after a few seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
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
}
