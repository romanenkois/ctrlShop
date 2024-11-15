import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  // used for addNewItem(), so it wouldn`t be accesible until the previous request result
  public addingNewItem: WritableSignal<boolean> = signal(false);

  private $cart: WritableSignal<Array<any>> = signal([]);

  constructor() {
    this.loadCartData();
  }

  public getCartData() {
    return this.$cart();
  }

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
    if (this.$cart().length === 0) {
      cartToSave = [];
    } else {
      cartToSave = this.simplifyCart(this.$cart());
    }
    
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }
 
  private updateCart(newList: Array<any>) {
    this.$cart.set(newList);
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
      this.$cart.set(result);
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
    this.$cart.set(result);
  }
  
  addToCart(productId: string) {
    // function isnt accesible when user made request
    // to add new item, when it wasnt resolved yet
    if (this.addingNewItem()) {
      return;
    }
    this.addingNewItem.set(true);

    let productInCart = this.$cart().find((product: any) => product._id === productId);
    let result = this.$cart();

    if (productInCart) {
      for (let index = 0; index < result.length; index++) {
        if (result[index]._id === productId) {
          result[index].quantity += 1;
        }
      }

      this.updateCart(result);
      setTimeout(() => { // has to do with how signals work, otherwise it woudnt properly notify consumers
        this.addingNewItem.set(false);
      }, 1);    
    } else {
      this.http.get(this.BASE_URL + 'product/' + productId).subscribe((res: any) => {
        res.quantity = 1;
        result.push(res);

        this.updateCart(result);
        this.addingNewItem.set(false);
      });
    }
  }

  getTotalCartPrice() {
    let totalPrice = 0;
    for (let index = 0; index < this.$cart().length; index++) {
      totalPrice += this.$cart()[index].price * this.$cart()[index].quantity;
    }

    return totalPrice
  }

  getSimpleCartData() {
    return this.simplifyCart(this.$cart());
  }

  removeFromCart(productId: string) {
    let productInCart = this.$cart().find((product: any) => product._id === productId);
    let newList: Array<any> = [];
    if (!productInCart) { return; }

    for (let index = 0; index < this.$cart().length; index++) {
      if (this.$cart()[index]._id != productId) {
        newList.push(this.$cart()[index]);
      }
    }

    this.updateCart(newList);
  }

  removeOneFromCart(productId: string) {
    let productInCart = this.$cart().find((product: any) => product._id === productId);
    let newList: Array<any> = [];
    if (!productInCart) { return; }

    for (let index = 0; index < this.$cart().length; index++) {
      if (this.$cart()[index]._id != productId) {
        newList.push(this.$cart()[index]);
      } else {
        if (this.$cart()[index].quantity > 1) {
          let item = this.$cart()[index]
          item.quantity -= 1;
          newList.push(item)
        }
      }
    }

    this.updateCart(newList);
  }  

  

  clearCart() {
    this.updateCart([]);
  }
}
