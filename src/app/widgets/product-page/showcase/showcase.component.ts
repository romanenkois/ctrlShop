import { Component, inject, OnInit } from '@angular/core';
import { productService } from './api/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../shared/cart/cart.service';


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
  private cartService: CartService = inject(CartService);
  
  product: any = [];

  addToCart(productId: any) {
    this.cartService.addToCart(productId);
  }

  ngOnInit() {
    this.router.url.subscribe(url => {
      this.productService.getProductData(url[1].path).subscribe(
        response => {
          this.product = response;
        },
        error => {
          window.location.href = 'error404';
        }
      )
    });
  }
}
