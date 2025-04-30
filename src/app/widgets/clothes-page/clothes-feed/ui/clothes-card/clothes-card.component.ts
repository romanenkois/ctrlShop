import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { CartService } from '@services';
import { FavoritesService } from '@shared/favorites/favorites.service';
import { TranslateTypePipe } from '@shared/pipes/translate-type.pipe';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/types';

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [TranslateTypePipe, RouterLink],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss',
})
export class ClothesCardComponent {
  private cartService: CartService = inject(CartService);
  private favoritesService: FavoritesService = inject(FavoritesService);

  product: InputSignal<any> = input.required();
  productInFavorites = computed(() =>
    this.favoritesService.isInFavorites(this.product()._id)
  );

  addToCart(product: Product, button: HTMLElement) {
    this.cartService.addToCart(this.product());

    // button.classList.add('click-animation');
    // setTimeout(() => button.classList.remove('click-animation'), 1000);
  }

  /**
   * Func adds product to favorites, if it isnt there
   * otherwise it removes from it
   */
  addToFavorites(productId: any, button: HTMLElement) {
    if (!this.productInFavorites()) {
      this.favoritesService.addToFavorites(productId);
    } else {
      this.favoritesService.removeFromFavorites(productId);
    }
  }
}
