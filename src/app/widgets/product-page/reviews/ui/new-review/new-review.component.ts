import { Component, computed, effect, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../api/reviews.service';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from '../../../../../shared/authorization/authorization.service';

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.scss'
})
export class NewReviewComponent {
  private reviewsService: ReviewsService = inject(ReviewsService);
  private fb: FormBuilder = inject(FormBuilder);
  
  authService: AuthorizationService = inject(AuthorizationService);
  userData = computed(() => this.authService.userData());

  productId: InputSignal<string> = input.required();
  reviewRating: WritableSignal<number> = signal(5);

  sendingReview = false;

  customerReview: FormGroup = this.fb.group({
    customerReviewText: ['', Validators.required],
  });

  setReviewRating(rating: number) {
    this.reviewRating.set(rating);
  }

  sendReview() {
    console.log(this.userData().picture)
    if (this.customerReview.valid && !this.sendingReview && this.userData().name) {
      this.sendingReview = true;

      this.reviewsService.sendNewReview(
        new Date().toISOString(),
        this.userData().email,
        this.userData().name,
        this.productId(),
        this.customerReview.get('customerReviewText')?.value,
        this.reviewRating(),
        this.userData().picture,
      ).subscribe((res: any) => {
        window.alert('ваш відгук успрішно надіслано!')
        this.sendingReview = false;
        this.reviewsService.getReviewsData(this.productId());
        this.customerReview.reset();
      })
    } else if (!this.userData().name) {
      window.alert('потрібно увійти в акаунт')
    } else if (!this.customerReview.valid) {
      window.alert('ваш відгук не може бути пустим')
    } else {
      window.alert('щось пішло не так\nпомилка 7832167')
    }
  }
}
