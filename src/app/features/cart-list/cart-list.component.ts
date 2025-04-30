import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@services';
import { Product } from '@types';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  private cartService: CartService = inject(CartService);

  cartList = computed(() => this.cartService.getCart());

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: Product) {
    this.cartService.removeFromCart({ product: item });
  }

  removeOneFromCart(item: Product) {
    this.cartService.removeOneFromCart({ product: item });
  }
}
