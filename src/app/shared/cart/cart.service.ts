import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  private cartObject = new BehaviorSubject<any[]>([]);
  $cart = this.cartObject.asObservable();

  private simplifyCart(cartData: any): Array<any> {
    let simpleCart: Array<any> = [];

    for (let index = 0; index < cartData.length; index++) {
      simpleCart.push({
        "productId": cartData[index]._id,
        "productQuantity": cartData[index].quantity
      })
    }

    return simpleCart;
  }

  private updateLS() {
    let cartToSave;
    console.log(this.cartObject.value.length)
    if (this.cartObject.value.length === 0) {
      cartToSave = [];
    } else {
      cartToSave = this.simplifyCart(this.cartObject.value);
    }
    
    console.log('updating: ', cartToSave)
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }

  private updateCart(newList: any) {
    this.cartObject.next(newList);
    this.updateLS();
  }

  private loadCartData() {
    console.log('loadiiiiiiing')

    let currentList;
    let result: any = [];

    // loading data from ls, catch for corupted data in ls
    try {
      currentList = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
      console.log('LS parsing error\n', e)
      currentList = [];
    }    

    // if local storage cart is empty, so will be the cart object,
    // so we just skip other part of loading
    if (currentList.length === 0) {
      this.cartObject.next(result);
      return;
    }

    console.log('loddd2')
    for (let i = 0; i < currentList.length; i++) {
      this.http.get(this.BASE_URL + 'product/' + currentList[i].productId).subscribe((res: any) => {
        res.quantity = currentList[i].productQuantity
        result.push(res);
      });
    }

    console.log('ressssssssssssssssssssult', result);
    this.cartObject.next(result);
  }

  constructor() {
    this.loadCartData();
  }

  addToCart(productId: string) {
    console.log(this.cartObject.value);

    let productInCart = this.cartObject.value.find((product: any) => product._id === productId);
    let result = this.cartObject.value;

    if (productInCart) {
      
    } else {
      this.http.get(this.BASE_URL + 'product/' + productId).subscribe((res: any) => {
        res.quantity = 1;
        result.push(res);
      });
    }

    this.updateCart(result);

  }

  removeFromCart(productId: string) {

  }

  removeOneFromCart(productId: string) {

  }  

  getTotalCartPrice(cart?: any) {
    return 1;
  }

  getCartData(cart: any) {
    return [];
  }

  getSimpleCartData() {
    return [];
  }

  clearCart() {

  }
}
