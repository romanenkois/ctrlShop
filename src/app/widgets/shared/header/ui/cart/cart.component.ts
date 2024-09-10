import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService: CartService = inject(CartService);

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
      this.cartList = cart;
    })
  }
}
