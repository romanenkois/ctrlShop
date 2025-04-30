import { Component, computed, inject } from '@angular/core';
import { FavoritesService } from '@shared/favorites/favorites.service';
import { CartService } from '@services';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/types';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {
  private favoritesService: FavoritesService = inject(FavoritesService)
  // private cartService: CartService = inject(CartService);

  favoritesList = computed(() => this.favoritesService.$favoritesList());
  favoritesData= computed(() => this.favoritesService.getFavoritesData());

  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  // }

  removeFromFavorite(productID: any) {
    this.favoritesService.removeFromFavorites(productID);
  }
}
