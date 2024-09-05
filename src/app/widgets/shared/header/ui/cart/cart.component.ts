import { Component, computed, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../../shared/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService: CartService = inject(CartService);

  // cartList = computed(() => {return this.cartService.getCartData()});
  // itemsInCart = computed(() => {
  //   // console.log("cartList", this.cartList);
  //   // console.log("cartListLen", this.cartList.length);
  //   console.log("cartService", this.cartService.getCartData2());
  //   return this.cartService.getCartData2().length > 0;
  // });

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
    })
  }
}
