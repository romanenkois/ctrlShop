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
      this.productReviews.set(data);
    });
  }

  sendNewReview(
    date: string,
    userId: string,
    userName: string,
    productId: string,
    reviewText: string,
    reviewRating: number,
    userPicture?: string,
  ) {
    const formData: FormData = new FormData();

    formData.append('date', date);
    formData.append('userId', userId);
    formData.append('userName', userName);
    formData.append('productId', productId);
    formData.append('reviewText', reviewText);
    formData.append('reviewRating', reviewRating.toString());
    if (userPicture) {
      formData.append('userPicture', userPicture);
    } else {
      formData.append('userPicture', 'https://ctrl-shop-back.vercel.app/defaultPicture/');
    }

    return this.http.post<any>(this.BASE_URL + '/review', formData);
  }
}
