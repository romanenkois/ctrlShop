import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartComponent } from "../../../features/cart/cart.component";
import { CartService } from '../../../shared/cart/cart.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [CartComponent]
})
export class HeaderComponent implements OnInit {
  private cartService: CartService = inject(CartService);

  redirectTo(url: string) {
    window.location.href = url;
  }

  clothesMenuVisibility = false;
  cartVisibility = false;

  toggleClothesMenu() {
    this.clothesMenuVisibility = !this.clothesMenuVisibility;
  }
  togleCart() {
    this.cartVisibility = !this.cartVisibility;
  }

  hideSelections = false;
  hideCart = false;

  // if user is adding new item to cart, show make animation to the button
  constructor() {
    effect(() => {
      if (this.cartService.addingNewItem()) {
        console.log('adding new item to cart');
        
        //find the button and add the animation
        const navCartButton = document.getElementById('nav-cart-button');
        if (navCartButton) {
          navCartButton.classList.add('highlight-animation');

          // then we remove it
          setTimeout(() => {
            navCartButton.classList.remove('highlight-animation');
          }, 1000);
        }
      }
    },{allowSignalWrites: true});
  }

  ngOnInit() {
    if (window.location.href.includes('clothes')) {
      this.hideSelections = true;
    }
    if (window.location.href.includes('cart')) {
      this.hideCart = true;
    }

    this.cartVisibility = false;  
  }
}
