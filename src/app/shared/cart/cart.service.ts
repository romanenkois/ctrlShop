import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  // used for addNewItem(), so it wouldn`t be accesible until the previous request result
  private addingNewItem: boolean = false;

  private cartObject = new BehaviorSubject<any[]>([]);
  $cart = this.cartObject.asObservable();

  private simplifyCart(cartData: Array<any>): Array<any> {
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
      cartToSave = [];
    } else {
      cartToSave = this.simplifyCart(this.cartObject.value);
    }
    
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }
 
  private updateCart(newList: Array<any>) {
    this.cartObject.next(newList);
    this.updateLS();
  }

  private loadCartData() {
    let currentList;
    let result: any = [];

    // loading data from ls, catch for corupted data in ls
    try {
      currentList = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
      currentList = [];
    }    

    // if local storage cart is empty, so will be the cart object,
    // so we just skip other part of loading
    if (currentList.length === 0) {
      this.cartObject.next(result);
      return;
    }

    // rendering of each product in cart
    // should be rewriten, when back is ready
    for (let i = 0; i < currentList.length; i++) {
      this.http.get(this.BASE_URL + 'product/' + currentList[i].productId).subscribe((res: any) => {
        res.quantity = currentList[i].productQuantity
        result.push(res);
      });
    }

    // updating the cart directly, otherwise it would earase data in LS
    this.cartObject.next(result);
  }  

  constructor() {
    this.loadCartData();
    console.log("cartlen",this.cartObject.value.length)
  }

  addToCart(productId: string) {
    // function isnt accesible when user made requaest to add new item, when it wasnt resolved yet
    if (this.addingNewItem) {
      return;
    }
    this.addingNewItem = true;

    let productInCart = this.cartObject.value.find((product: any) => product._id === productId);
    let result = this.cartObject.value;

    if (productInCart) {
      for (let index = 0; index < result.length; index++) {
        if (result[index]._id === productId) {
          result[index].quantity += 1;
        }
      }
      
    } else {
      this.http.get(this.BASE_URL + 'product/' + productId).subscribe((res: any) => {
        res.quantity = 1;
        result.push(res);
      });
    }

    this.updateCart(result);
    this.addingNewItem = false;
  }

  removeFromCart(productId: string) {
    let productInCart = this.cartObject.value.find((product: any) => product._id === productId);
    let newList: Array<any> = [];
    if (!productInCart) { return; }

    for (let index = 0; index < this.cartObject.value.length; index++) {
      if (this.cartObject.value[index]._id != productId) {
        newList.push(this.cartObject.value[index]);
      }
    }

    this.updateCart(newList);
  }

  removeOneFromCart(productId: string) {
    let productInCart = this.cartObject.value.find((product: any) => product._id === productId);
    let newList: Array<any> = [];
    if (!productInCart) { return; }

    for (let index = 0; index < this.cartObject.value.length; index++) {
      if (this.cartObject.value[index]._id != productId) {
        newList.push(this.cartObject.value[index]);
      } else {
        if (this.cartObject.value[index].quantity > 1) {
          let item = this.cartObject.value[index]
          item.quantity -= 1;
          newList.push(item)
        }
      }
    }

    this.updateCart(newList);
  }  

  getTotalCartPrice(cart?: any) {
    let totalPrice = 0;
    for (let index = 0; index < this.cartObject.value.length; index++) {
      totalPrice += this.cartObject.value[index].price * this.cartObject.value[index].quantity;
    }

    return totalPrice
  }

  getCartData() {
    return this.cartObject.value;
  }

  getSimpleCartData() {
    return this.simplifyCart(this.cartObject.value);
  }

  clearCart() {
    this.updateCart([]);
  }
}
