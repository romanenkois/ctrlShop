import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { productService } from './api/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit {
  private productService: productService = inject(productService);
  private router: ActivatedRoute = inject(ActivatedRoute);

  product: any;

  ngOnInit() {
    this.router.url.subscribe(url => {
      this.productService.getProductData(url[1].path).subscribe(
        response => {
          this.product = response;
        }
      )
    });
  }
}
