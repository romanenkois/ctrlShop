import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FavoritesService } from '../../../shared/favorites/favorites.service';
import { CartService } from '../../../shared/cart/cart.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {
  private favoritesService: FavoritesService = inject(FavoritesService)
  private cartService: CartService = inject(CartService);

  favoritesList: WritableSignal<any> = signal([]);

  constructor() {
    effect(() => {
      this.favoritesList = this.favoritesService.$favoritesList;
      console.log(this.favoritesService.getFavoritesData());
    })
  }

  addToCart(productId: any) {
    this.cartService.addToCart(productId);
  }

  removeFromFavorite(productID: any) {
    this.favoritesService.removeFromFavorites(productID);
  }
}
