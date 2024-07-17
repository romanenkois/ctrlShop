import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  getProducts(productIds: any): any {
    let result: any = [];

    for (let i = 0; i < productIds.length; i++) {
      let id = productIds[i].productId;
      console.log(id);

      this.http.get(this.BASE_URL + 'product/' + id).subscribe((res) => {
        result.push(res);
      });
    }

    console.log(result);
    return result;
  }
}
