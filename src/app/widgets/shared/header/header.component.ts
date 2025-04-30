import { Component, effect, inject, OnInit } from '@angular/core';
import { CartComponent } from '@features/cart/cart.component';
import { CartService } from '@services';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CartComponent, RouterLink],
})
export class HeaderComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);

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
    effect(
      () => {
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
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.hideSelections = event.url.includes('clothes');
        this.hideCart = event.url.includes('order');
      });

    this.cartVisibility = false;
  }
}
