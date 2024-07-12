import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss'
})
export class ClothesCardComponent {
  private cartService: CartService = inject(CartService);

  product: InputSignal<any> = input.required();

  addToCart(productId: any) {
    this.cartService.addToCart(productId);
  }
}
