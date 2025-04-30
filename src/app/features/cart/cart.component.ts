import { Component, computed, inject } from '@angular/core';
import { CartService } from '@services';
import { RouterLink } from '@angular/router';
import { CartListComponent } from "../cart-list/cart-list.component";
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService: CartService = inject(CartService);

  cartList = computed(() => this.cartService.getCart());

  getTotal(): number {
    return this.cartService.getTotalCartPrice();
  }
}
