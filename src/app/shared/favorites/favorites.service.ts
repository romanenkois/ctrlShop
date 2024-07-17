import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  private favoritesObject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  $favoritesList = this.favoritesObject.asObservable();


  private updateFavorites(newList: any[]) {
    this.favoritesObject.next(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  }
  
  getFavoritesData(favorites: any) {
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
    const currentList = this.favoritesObject.value;
    const productInFavorites = currentList.find((product: any) => product.productId === productId);
    
    if (!productInFavorites) {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        newList[i] = currentList[i];
      }

      newList[currentList.length] = {productId: productId};
      this.updateFavorites(newList);
    }
    
  }

  removeFromFavorites(productId: string) {
    const currentList = this.favoritesObject.value;
    const productInFavorites = currentList.find((product: any) => product.productId === productId);
    if (productInFavorites) {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].productId !== productId) {
          newList[newList.length] = currentList[i];
        }
      }

      console.log(newList);

      this.updateFavorites(newList);
    }    
  }
}
