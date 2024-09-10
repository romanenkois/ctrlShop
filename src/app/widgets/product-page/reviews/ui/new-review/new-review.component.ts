import { Component, inject, input, InputSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../api/reviews.service';

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.scss'
})
export class NewReviewComponent {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private reviewsService: ReviewsService = inject(ReviewsService);
  private fb: FormBuilder = inject(FormBuilder);

  productId: InputSignal<string> = input.required();

  sendingReview = false;

  customerReview: FormGroup = this.fb.group({
    customerReviewText: ['', Validators.required],
  });

  sendReview() {
    if (this.customerReview.valid && !this.sendingReview) {
      this.sendingReview = true;

      this.reviewsService.sendNewReview(
        new Date().toISOString(),
        '1',
        'джоу доу',
        this.productId(),
        this.customerReview.get('customerReviewText')?.value,
        5,
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
