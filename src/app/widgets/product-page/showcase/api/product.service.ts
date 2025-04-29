import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { $appConfig } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class productService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = $appConfig.api.BASE_API_URL;

  getProductData(id: string) {
    return this.http.get(this.BASE_URL + '/product/' + id)
  }
}
