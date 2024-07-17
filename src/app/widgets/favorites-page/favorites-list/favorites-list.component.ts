import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FavoritesService } from '../../../shared/favorites/favorites.service';
import { CartService } from '../../../shared/cart/cart.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent implements OnInit {
  private favoritesService: FavoritesService = inject(FavoritesService)
  private cartService: CartService = inject(CartService);

  favoritesList: any = [];
  favoritesData: any = [];

  // constructor() {
  //   effect(() => {
  //     // this.favoritesList = this.favoritesService.$favoritesList;
  //     // this.favoritesData = this.favoritesService.getFavoritesData();

  //     console.log(this.favoritesData());
  //   })
  // }

  addToCart(productId: any) {
    this.cartService.addToCart(productId);
  }

  removeFromFavorite(productID: any) {
    this.favoritesService.removeFromFavorites(productID);
  }

  ngOnInit() {
    // this.favoritesData.set(this.favoritesService.getFavoritesData());
    this.favoritesService.$favoritesList.subscribe((favorites: any) => {
      this.favoritesList = favorites;
      this.favoritesData = favorites;
      console.log(favorites);
    });
  }
}
