import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Cart, CartItem, CartSimple, Product } from '@types';
import { $appConfig } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = $appConfig.api.BASE_API_URL;

  // used for addNewItem(), so the method wouldn`t be accesible until the previous request result
  public addingNewItem: WritableSignal<boolean> = signal(false);

  private $cart: WritableSignal<Cart> = signal({ items: [] });

  constructor() {
    this.loadCartFromLS();
  }

  public getCartData(): Cart {
    return this.$cart();
  }

  private simplifyCart(cartData: Cart): CartSimple {
    let simpleCart: CartSimple = { items: [] };

    for (let index = 0; index < cartData.items.length; index++) {
      simpleCart.items.push({
        productId: cartData.items[index].item._id,
        productQuantity: cartData.items[index].quantity,
      });
    }

    return simpleCart;
  }

  private updateLS() {
    if (this.$cart().items.length === 0) {
      localStorage.removeItem('cart');
    } else {
      const cartToSave = this.simplifyCart(this.$cart());
      localStorage.setItem('cart ', JSON.stringify(cartToSave));
    }
  }

  private updateCartItems(items: Cart['items']) {
    const cart = this.$cart();
    cart.items = items;

    this.$cart.set(cart);
    this.updateLS();
  }

  private setCart(cart: Cart) {
    this.$cart.set(cart);
    this.updateLS();
  }

  private loadCartFromLS() {
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
      this.http
        .get(this.BASE_URL + 'product/' + currentList[i].productId)
        .subscribe((res: any) => {
          res.quantity = currentList[i].productQuantity;
          result.push(res);
        });
    }

    // updating the cart directly, otherwise it would earase data in LS
    this.$cart.set(result);
  }

  addToCart(product: Product) {
    // function isnt accesible when user made request
    // to add new item, when it wasnt resolved yet
    if (this.addingNewItem()) {
      return;
    }
    this.addingNewItem.set(true);

    const productInCart = this.$cart().items.find(
      (item: CartItem) => item.item._id === product._id
    );
    const newCart = this.$cart();

    if (productInCart) {
      for (let index = 0; index < newCart.items.length; index++) {
        if (newCart.items[index].item._id === product._id) {
          newCart.items[index].quantity += 1;
        }
      }

      this.updateCartItems(newCart['items']);

      setTimeout(() => {
        // has to do with how signals work, otherwise it woudnt properly notify consumers
        this.addingNewItem.set(false);
      }, 1);
    } else {
      newCart.items.push({ item: product, quantity: 1 });
      this.updateCartItems(newCart['items']);
    }
  }

  getTotalCartPrice() {
    let totalPrice = 0;
    for (let index = 0; index < this.$cart().items.length; index++) {
      totalPrice +=
        this.$cart().items[index].item.price *
        this.$cart().items[index].quantity;
    }

    return totalPrice;
  }

  getSimpleCartData() {
    // return this.simplifyCart(this.$cart());
  }

  removeFromCart(params: { productId: string } | { product: Product }) {
    const id = 'productId' in params ? params.productId : params.product._id;
    const productInCart = this.$cart().items.find(
      (product: any) => product._id === id
    );
    if (!productInCart) {
      return;
    }

    let newList: Array<any> = [];
    for (let index = 0; index < this.$cart().items.length; index++) {
      if (this.$cart().items[index].item._id != id) {
        newList.push(this.$cart().items[index]);
      }
    }

    this.updateCartItems(newList);
  }

  removeOneFromCart(params: { productId: string } | { product: Product }) {
    const id = 'productId' in params ? params.productId : params.product._id;
    const productInCart = this.$cart().items.find(
      (item: CartItem) => item.item._id === id
    );
    if (!productInCart) {
      return;
    }
    const newCart: Cart = { items: [] };

    for (let index = 0; index < this.$cart().items.length; index++) {
      if (this.$cart().items[index].item._id != id) {
        newCart.items.push(this.$cart().items[index]);
      } else {
        if (this.$cart().items[index].quantity > 1) {
          const item = this.$cart().items[index];
          item.quantity -= 1;
          newCart.items.push(item);
        }
      }
    }

    this.updateCartItems(newCart['items']);
  }

  clearCart() {
    this.setCart({ items: [] });
  }
}
