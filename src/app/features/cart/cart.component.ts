import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../shared/cart/cart.service';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/types';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService: CartService = inject(CartService);

  cartList = computed(() => this.cartService.getCartData());

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: Product) {
    this.cartService.removeFromCart({product: item});
  }

  removeOneFromCart(item: Product) {
    this.cartService.removeOneFromCart({product: item});
  }

  getTotal(): number {
    return this.cartService.getTotalCartPrice();
  }
}
