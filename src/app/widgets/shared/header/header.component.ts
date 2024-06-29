import { Component } from '@angular/core';
import { CartComponent } from "./ui/cart/cart.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [CartComponent]
})
export class HeaderComponent {
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
}
