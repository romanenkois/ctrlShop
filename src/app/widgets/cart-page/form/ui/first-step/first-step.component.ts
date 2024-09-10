import { Component, inject } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {
  private cartService: CartService = inject(CartService);

  itemsInCart = true;
  cartList: any = [];

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  removeOneFromCart(item: any) {
    this.cartService.removeOneFromCart(item);
  }

  getTotal(items: any): number {
    return this.cartService.getTotalCartPrice(items);
  }

  ngOnInit() {
    this.cartService.$cart.subscribe((cart: any) => {
      this.itemsInCart = cart.length > 0;
      this.cartList = cart;
    }); 
  }
}
