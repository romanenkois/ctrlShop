import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartObject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  $cart = this.cartObject.asObservable();

  private updateCart(newList: any[]) {
    this.cartObject.next(newList);
    localStorage.setItem('cart', JSON.stringify(newList));
  }

  addToCart(productId: string) {
    const currentList = this.cartObject.value;
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      const newList = [...currentList, { productId, productQuantity: 1 }];
      this.updateCart(newList);
    } else {
      const newList = currentList.map((product: any) =>
        product.productId === productId
          ? { ...product, productQuantity: product.productQuantity + 1 }
          : product
      );
      this.updateCart(newList);
    }
  }

  removeFromCart(productId: string) {
    const currentList = this.cartObject.value;
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      console.log('ERROR', productId, 'couldn`t be found in cart');
    } else {
      const newList = currentList.filter((product: any) => product.productId !== productId);
      this.updateCart(newList);
      console.log('REMOVING', productId, 'from cart');
    }
  }
}
