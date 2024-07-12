import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  $cart: WritableSignal<any> = signal(JSON.parse(localStorage.getItem('cart') || '[]'));
  
  constructor() {
    effect(() => {
      console.log(this.$cart());
      localStorage.setItem('cart', JSON.stringify(this.$cart()));
    })
  }

  addToCart(productId: string) {
    this.$cart().set(JSON.parse(`[{"id": "${productId}", "quantity": 1}]`));
  }
}
