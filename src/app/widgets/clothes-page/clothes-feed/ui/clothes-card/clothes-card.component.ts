import { ChangeDetectorRef, Component, ElementRef, inject, input, Input, InputSignal, Renderer2 } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { FavoritesService } from '../../../../../shared/favorites/favorites.service';
import { TranslateTypePipe } from "../../../../../shared/pipes/translate-type.pipe";

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [TranslateTypePipe],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss'
})
export class ClothesCardComponent {
  private renderer: Renderer2 = inject(Renderer2);

  private cartService: CartService = inject(CartService);
  private favoritesService: FavoritesService = inject(FavoritesService); 

  product: InputSignal<any> = input.required();

  addToCart(productId: any, button: HTMLElement) {
    this.cartService.addToCart(productId);

    // Apply slyles to the button after action has been indeed done
    this.renderer.setStyle(button, 'transition', 'background 0.5s ease-out');
    this.renderer.setStyle(button, 'background', 'var(--yellow-color)');
    setTimeout(() => {
      this.renderer.setStyle(button, 'background', '');
    }, 1000);
  }

  addToFavorites(productId: any, button: HTMLElement) {
    this.favoritesService.addToFavorites(productId);

    // Apply slyles to the button after action has been indeed done
    this.renderer.setStyle(button, 'transition', 'background 0.5s ease-out');
    this.renderer.setStyle(button, 'background', 'var(--yellow-color)');
    setTimeout(() => {
      this.renderer.setStyle(button, 'background', '');
    }, 1000);
  }
}
