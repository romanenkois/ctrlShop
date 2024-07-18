import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
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

  itemsInCart = true;
  cartList: any = [];

  getTotal(items: any): number {
    return this.cartService.getTotalCartPrice(items);
  }

  ngOnInit() {
    this.cartService.$cart.subscribe((cart: any) => {
      this.itemsInCart = cart.length > 0;
      this.cartList = this.cartService.getCartData(cart);          
    }); 
  }
}
