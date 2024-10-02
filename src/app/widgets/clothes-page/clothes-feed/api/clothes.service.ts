import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class clothesService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';
  // private BASE_URL: string = 'http://localhost:3000';

  getClothesData(
    category: string,
    page?: number,
    sorting?: string
    ) {
      let urlString: string = `${this.BASE_URL}/products/${category}`;
      if (page) {
        urlString += `/${page}`;
        if (sorting) {
          urlString += `/${sorting}`;
        }
      }
      
    return this.http.get<any>(urlString);
  }
}
