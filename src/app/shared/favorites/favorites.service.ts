import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FavoritesApiService } from './api/favorites-api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private dataService: FavoritesApiService = inject(FavoritesApiService);
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  $favoritesList: WritableSignal<any> = signal(JSON.parse(localStorage.getItem('favorites') || '[]'));

  constructor() {
    effect(() => {
      // console.log(this.$favoritesList());
      localStorage.setItem('favorites', JSON.stringify(this.$favoritesList()));
    });
  }

  getFavoritesList() {
    return this.$favoritesList();
  }

  
  getFavoritesData(): any {
    let result: any = [];

    for (let i = 0; i < this.$favoritesList().length; i++) {
      let id: any = this.$favoritesList()[i].productId;
      console.log(id);
    
      this.http.get(this.BASE_URL + 'product/' + id).subscribe((res) => {
        result.push(res);
      });
    }

    console.log(result);
    return result;
  }

  // getFavoritesData() {
  //   this.dataService.getProducts(this.$favoritesList()).subscribe((res: any) => {
  //     return res
  //   })
  //   // return this.dataService.getProducts(this.$favoritesList());
  // }

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
