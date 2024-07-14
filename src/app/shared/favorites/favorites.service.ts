import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FavoritesApiService } from './api/favorites-api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private dataService: FavoritesApiService = inject(FavoritesApiService);

  $favoritesList: WritableSignal<any> = signal(JSON.parse(localStorage.getItem('favorites') || '[]'));

  constructor() {
    effect(() => {
      console.log(this.$favoritesList());
      localStorage.setItem('favorites', JSON.stringify(this.$favoritesList()));
    });
  }

  getFavoritesList() {
    return this.$favoritesList();
  }

  getFavoritesData() {
    return this.dataService.getProducts(this.$favoritesList());
  }

  addToFavorites(productId: string) {
    
    const currentList = this.$favoritesList();

    const productInFavorites = currentList.find((product: any) => product.productId === productId);
    if (!productInFavorites) {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        newList[i] = currentList[i];
      }

      newList[currentList.length] = {productId: productId};
      this.$favoritesList.set(newList);
    }
    
  }

  removeFromFavorites(productId: string) {
    const currentList = this.$favoritesList();
    const newList: any = [];
    let j = 0;

    for (let i = 0; i < currentList.length; i++) {
      if (currentList[i].productId !== productId) {
        newList[j] = currentList[i];
        j++;
      }
    }

    this.$favoritesList.set(newList);
  }
}
