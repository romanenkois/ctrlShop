import { Component, computed, inject, OnInit } from '@angular/core';
import { ReviewsService } from './api/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private reviewsService: ReviewsService = inject(ReviewsService);

  reviews = computed(() => this.reviewsService.productReviews());

  ngOnInit() {
    this.router.url.subscribe(url => {
      this.reviewsService.getReviewsData(url[1].path);
    });
  }
}
