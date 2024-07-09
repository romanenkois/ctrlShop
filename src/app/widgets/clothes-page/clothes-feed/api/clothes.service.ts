import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class clothesService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';
  // private BASE_URL: string = 'localhost:3000/'


  getClothesData(
    category: string,
    page?: number,
    sortByName?: string,
    sortByPrice?: string) {
      return this.http.get(
        this.BASE_URL + 
        '/products/'
      )
  }

}
