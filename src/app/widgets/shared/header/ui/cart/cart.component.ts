import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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

  itemsInCart = false;

  cartList: any = [];

  ngOnInit() {
    this.cartService.$cart.subscribe((cart: any) => {
      this.cartList = cart;
      this.itemsInCart = cart.length > 0;
    });
  }
}
