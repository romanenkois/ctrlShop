import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { productService } from './api/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@services';
import { FavoritesService } from '@shared/favorites/favorites.service';
import { TranslateTypePipe } from "@shared/pipes/translate-type.pipe";
import { Product } from '@shared/types';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [ TranslateTypePipe],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private renderer: Renderer2 = inject(Renderer2);

  private productService: productService = inject(productService);
  private cartService: CartService = inject(CartService);
  private favoriteService: FavoritesService = inject(FavoritesService);

  product: any = [];

  addToCart(product: Product, button: HTMLElement) {
    this.cartService.addToCart(product);

    // Apply styles to the button after action has been indeed done
    this.renderer.setProperty(button, 'innerText', 'додано!');
    setTimeout(() => {
      this.renderer.setProperty(button, 'innerText', 'додати в корзини');
    }, 750);
  }

  addToFavorites(productId: any, button: HTMLElement) {
    this.favoriteService.addToFavorites(productId);

    // Apply styles to the button after action has been indeed done
    this.renderer.setStyle(button, 'transition', 'background 0.5s ease-out');
    this.renderer.setStyle(button, 'background', 'var(--yellow-color)');
    setTimeout(() => {
      this.renderer.setStyle(button, 'background', '');
    }, 1000);
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
