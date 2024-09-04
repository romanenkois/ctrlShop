import { Component, computed, inject, OnInit } from '@angular/core';
import { ReviewsService } from './api/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
sendReview() {
throw new Error('Method not implemented.');
}
  private router: ActivatedRoute = inject(ActivatedRoute);
  private reviewsService: ReviewsService = inject(ReviewsService);
  private fb: FormBuilder = inject(FormBuilder);

  reviews = computed(() => this.reviewsService.productReviews());

  customerReview: FormGroup = this.fb.group({
    customerReviewText: ['', Validators.required],
  });

  ngOnInit() {
    this.router.url.subscribe(url => {
      this.reviewsService.getReviewsData(url[1].path);
    });
  }
}
