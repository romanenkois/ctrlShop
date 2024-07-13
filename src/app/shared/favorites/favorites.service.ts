import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  $favoritesList: WritableSignal<any> = signal(JSON.parse(localStorage.getItem('favorites') || '[]'));

  constructor() {
    effect(() => {
      console.log(this.$favoritesList());
      localStorage.setItem('favorites', JSON.stringify(this.$favoritesList()));
    });
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
}
