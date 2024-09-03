import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app';

  productReviews: WritableSignal<any> = signal([]);

  getReviewsData(id: string) {
    this.http.get(`${this.BASE_URL}/reviews/${id}`).pipe().subscribe((data: any) => {
      console.log('121');
      console.log(data);
      console.log(`${this.BASE_URL}/reviews/${id}`);
      this.productReviews.set(data);
    });
  }
}
