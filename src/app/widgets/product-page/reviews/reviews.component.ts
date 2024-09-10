import { Component, computed, inject, OnInit } from '@angular/core';
import { ReviewsService } from './api/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductReviewsComponent } from "./ui/product-reviews/product-reviews.component";
import { NewReviewComponent } from "./ui/new-review/new-review.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProductReviewsComponent, NewReviewComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private reviewsService: ReviewsService = inject(ReviewsService);
  private fb: FormBuilder = inject(FormBuilder);

  productId: string = '';

  ngOnInit() {
    this.router.url.subscribe(url => {
      this.productId = url[1].path;
      this.reviewsService.getReviewsData(this.productId);
    });
  }
}
