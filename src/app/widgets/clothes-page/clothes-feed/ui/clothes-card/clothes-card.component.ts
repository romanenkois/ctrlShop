import { Component, inject, input, InputSignal } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { FavoritesService } from '../../../../../shared/favorites/favorites.service';
import { TranslateTypePipe } from "../../../../../shared/pipes/translate-type.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [TranslateTypePipe, CommonModule],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss'
})
export class ClothesCardComponent {
  private cartService: CartService = inject(CartService);
  private favoritesService: FavoritesService = inject(FavoritesService); 

  product: InputSignal<any> = input.required();

  addToCart(productId: any, button: HTMLElement) {
    this.cartService.addToCart(productId);

    button.classList.add('click-animation');
    setTimeout(() => button.classList.remove('click-animation'), 1000);
  }

  addToFavorites(productId: any, button: HTMLElement) {
    this.favoritesService.addToFavorites(productId);

    button.classList.add('click-animation');
    setTimeout(() => button.classList.remove('click-animation'), 1000);
  }
}
