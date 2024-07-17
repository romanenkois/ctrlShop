import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  $cart: any = new BehaviorSubject(JSON.parse(localStorage.getItem('cart') || '[]'));

  addToCart(productId: string) {
    const currentList: any = this.$cart.value;
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        newList[i] = currentList[i];
      }

      newList[currentList.length] = {
        productId: productId,
        productQuantity: 1
      };

      this.$cart = [];
      this.$cart = newList;
    } else {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        newList[i] = currentList[i];
        if (currentList[i].productId === productId) {
          newList[i].productQuantity += 1;
        }
      }

      this.$cart = [];
      this.$cart = newList;
    }
    
    localStorage.setItem('cart', JSON.stringify(this.$cart));
  }

  removeFromCart(productId: string) {
    const currentList = this.$cart;
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      console.log('ERROR ', productId, ' couldn`t be found in cart')
    } else {
      console.log('REMOVING ', productId, ' from cart')
    }
  }
}
