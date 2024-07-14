import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class clothesService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';

  getClothesData(
    category: string,
    page?: number,
    sortByName?: string,
    sortByPrice?: string) {

    return this.http.get<any>(
      this.BASE_URL + 
      '/products/' +
      category +
      '/' +
      page
    )
  }
}
