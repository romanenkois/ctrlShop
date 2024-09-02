import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService: CartService = inject(CartService);

  itemsInCart: boolean = true;
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
    this.cartService.getCartData().subscribe((cart: any) => {
      console.log("caaaaaaa", cart);
      this.cartList = cart;
      this.itemsInCart = cart.length > 0;
    })
  }
}
