import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';
  // private BASE_URL: string = 'http://localhost:3000';

  uploadOrder(
    date: string,
    userId: string,
    orderData: any,
    customerData: any,
    deliveryData: any,
    extraData: any
  ) {
    const formData: FormData = new FormData();

    formData.append('date', date);
    formData.append('userId', userId);
    formData.append('orderData', JSON.stringify(orderData));
    formData.append('customerData', JSON.stringify(customerData));
    formData.append('deliveryData', JSON.stringify(deliveryData));
    formData.append('extraData', JSON.stringify(extraData));

    return this.http.post<any>(this.BASE_URL + '/order', formData);
  }
}
