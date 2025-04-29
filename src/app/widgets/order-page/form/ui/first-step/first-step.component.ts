import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {
  private cartService: CartService = inject(CartService);

  itemsInCart = computed(() => this.cartService.getCartData().items.length > 0);
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

  getTotal(): number {
    return this.cartService.getTotalCartPrice();
  }
}
