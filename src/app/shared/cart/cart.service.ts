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
    if (this.cartObject.value.length === 0) {
      cartToSave = this.simplifyCart(this.cartObject);
    } else {
      cartToSave = [];
    }
    
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }

  private updateCart(newList: any) {

  }

  private loadCartData() {
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

    for (let i = 0; i < currentList.length; i++) {
      let id = currentList[i].productId
      this.http.get(this.BASE_URL + 'product/' + id).subscribe((res: any) => {
        result.push(res);
      });
    }
  }

  constructor() {
    this.loadCartData();
  }

  addToCart(productId: string) {
    let productInCart = this.cartObject.value.find((product: any) => product._id === productId);
  
    if (productInCart) {
      
      console.log("1")
    } else {

      console.log(this.cartObject.value)
      console.log('2')
    }
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
