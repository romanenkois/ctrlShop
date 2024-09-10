import { Component, effect, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../api/reviews.service';
import { CommonModule } from '@angular/common';

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
    if (this.customerReview.valid && !this.sendingReview) {
      this.sendingReview = true;

      this.reviewsService.sendNewReview(
        new Date().toISOString(),
        '__user_id__',
        'джоу доу',
        this.productId(),
        this.customerReview.get('customerReviewText')?.value,
        this.reviewRating(),
      ).subscribe((res: any) => {
        window.alert('ваш відгук успрішно надіслано!\nвін зв\'явиться на сайті щойно пройде модеріцію')
        this.sendingReview = false;
        this.reviewsService.getReviewsData(this.productId());
        this.customerReview.reset();
      })
    } else {
      window.alert('будь ласка, заповніть поле відгуку')
    }
  }
}
