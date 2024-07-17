import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  $cart: WritableSignal<any> = signal(JSON.parse(localStorage.getItem('cart') || '[]'));
  
  constructor() {
    effect(() => {
      // this doesn't seem to work as intended
      localStorage.setItem('cart', JSON.stringify(this.$cart()));
    })
  }

  addToCart(productId: string) {
    const currentList = this.$cart();
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
      this.$cart.set(newList);
      console.log(this.$cart())
    } else {
      const newList: any = [];

      for (let i = 0; i < currentList.length; i++) {
        newList[i] = currentList[i];
        if (currentList[i].productId === productId) {
          newList[i].productQuantity += 1;
        }
      }

      this.$cart.set(currentList);
    }
    localStorage.setItem('cart', JSON.stringify(this.$cart()));
  }

  removeFromCart(productId: string) {
    const currentList = this.$cart();
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      console.log('ERROR ', productId, ' couldn`t be found in cart')
    } else {
      
    }
  }
}
