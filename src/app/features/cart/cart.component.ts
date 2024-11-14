import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../shared/cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService: CartService = inject(CartService);

  cartList = computed(() => this.cartService.getCartData());

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  removeOneFromCart(item: any) {
    this.cartService.removeOneFromCart(item);
  }

  getTotal(items: any): number {
    return this.cartService.getTotalCartPrice();
  }
}
