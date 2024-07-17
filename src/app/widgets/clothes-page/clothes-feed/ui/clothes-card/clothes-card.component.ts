import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { FavoritesService } from '../../../../../shared/favorites/favorites.service';

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss'
})
export class ClothesCardComponent {
  private cartService: CartService = inject(CartService);
  private favoritesService: FavoritesService = inject(FavoritesService); 

  product: InputSignal<any> = input.required();

  addToCart(productId: any) {
    this.cartService.addToCart(productId);

    setTimeout(() => {
      const cartButton = document.getElementById('cart-button');
      if (cartButton) {
        cartButton.style.transition = 'background 0.5s ease-out';
        cartButton.style.background = 'var(--yellow-color)';
        setTimeout(() => {
          cartButton.style.background = '';
        }, 1000);
      }
    }, 0);
  }

  addToFavorites(productId: any) {
    this.favoritesService.addToFavorites(productId);

    setTimeout(() => {
      const cartButton = document.getElementById('favorites-button');
      if (cartButton) {
        cartButton.style.transition = 'background 0.5s ease-out';
        cartButton.style.background = 'var(--yellow-color)';
        setTimeout(() => {
          cartButton.style.background = '';
        }, 1000);
      }
    }, 0);
  }
}
