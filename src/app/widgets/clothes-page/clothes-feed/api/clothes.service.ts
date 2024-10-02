import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class clothesService {
  private http: HttpClient = inject(HttpClient);

  // private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';
  private BASE_URL: string = 'http://localhost:3000';

  getClothesData(
    category: string,
    page?: number,
    sorting?: string
    ) {
    return this.http.get<any>(
      this.BASE_URL + 
      '/products/' +
      category +
      '/' +
      page + 
      '/' +
      sorting
    )
  }
}
