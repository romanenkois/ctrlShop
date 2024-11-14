import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  $favoritesList: WritableSignal<any> = signal([]);
  $favoritesData: WritableSignal<any> = signal([]);

  constructor() {
    this.$favoritesList.set(JSON.parse(localStorage.getItem('favorites') || '[]'))
  }
 
  /**
   * Returns a list of favs, in simple format of 
   * [{productId: string}, ..]
   */
  public getFavoritesList() {
    return this.$favoritesList();
  }

  /**
   * Returns a list of favs, in full format of 
   * [{_id: string, name: string, ..}, ..]
   */
  public getFavoritesData() {
    return this.fetchFavoritesData(this.$favoritesList());
  }

  /**
   * Returns true if the product is in the favorites list
   */
  public isInFavorites(productId: string) {
    const currentList = this.$favoritesList();
    const productInFavorites = currentList.find((product: any) => product.productId === productId);
    return !!productInFavorites;
  }

  // used to set the new value of fav list, and to put it into LS
  private setFavoritesList(newList: any[]) {
    this.$favoritesList.set(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  }
  
  // used to fetch data from the API of items in the favorites list
  private fetchFavoritesData(favorites: any) {
    let result: any = [];

    for (let i = 0; i < favorites.length; i++) {
      let id: any = favorites[i].productId;
      console.log(id);
    
      this.http.get(this.BASE_URL + 'product/' + id).subscribe((res) => {
        result.push(res);
      });
    }

    console.log(result);
    return result;
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
      this.setFavoritesList(newList);
    }
    
  }

  removeFromFavorites(productId: string) {
    const currentList = this.$favoritesList();
    const productInFavorites = currentList.find((product: any) => product.productId === productId);
    if (productInFavorites) {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].productId !== productId) {
          newList[newList.length] = currentList[i];
        }
      }

      console.log(newList);

      this.setFavoritesList(newList);
    }    
  }
}
