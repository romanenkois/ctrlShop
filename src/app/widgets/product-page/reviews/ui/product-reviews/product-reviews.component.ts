import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReviewsService } from '../../api/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss'
})
export class ProductReviewsComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private reviewsService: ReviewsService = inject(ReviewsService);
  private fb: FormBuilder = inject(FormBuilder);

  reviews = computed(() => this.reviewsService.productReviews());
  reviewsCount = computed(() => this.reviewsService.productReviews().length);
  reviewsCountString = computed(() => {
    if (this.reviewsCount() === 0 || this.reviewsCount() >= 5) {
      return ' відгуків';
    } else if (this.reviewsCount() === 1) {
      return ' відгук';
    } else {
      return ' відгуки';
    }
  });

  productRating = computed(() => {
    if (this.reviewsCount() === 0) return 0;
    const totalRating = this.reviews().reduce((acc: number = 0, review: any) => acc + parseInt(review.reviewRating, 10), 0);
    return totalRating / this.reviewsCount();
  });
  
  getRatingArray(): number[] {
    return Array(Math.floor(this.productRating())).fill(0);
  }

  ngOnInit() {

  }
}
