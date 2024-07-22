import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);

  private BASE_URL: string = 'https://ctrl-shop-back.vercel.app/';

  private cartObject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  $cart = this.cartObject.asObservable();

  // cartData = new BehaviorSubject<any[]>([]);

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

    console.log(this.cartObject.value);
    console.log(JSON.stringify(this.cartObject.value));
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

  removeOneFromCart(productId: string) {
    console.log(productId);
    const currentList = this.cartObject.value;
    const productInCart = currentList.find((product: any) => product.productId === productId);

    if (!productInCart) {
      console.log('ERROR', productId, 'couldn`t be found in cart');
    } else {
      let newList: any[] = [];

      currentList.forEach(product => {
        console.log(product);
        if (product.productId === productId) {
          if (product.productQuantity > 1) {
            console.log('REMOVING ONE', productId, 'from cart');
            newList.push({ ...product, productQuantity: product.productQuantity - 1 });
            console.log({ ...product, productQuantity: product.productQuantity - 1 });
          }          
        } else {
          newList.push(product);
        }
      });

      this.updateCart(newList);
    }    
  }

  getCartData(cartData: any) {
    const currentList = cartData;
    let result: any = [];

    for (let i = 0; i < currentList.length; i++) {
      let id: any = currentList[i].productId;

      this.http.get(this.BASE_URL + 'product/' + id).subscribe((res: any) => {
        res['quantity'] = currentList[i].productQuantity;
        result.push(res);
      });
    }

    return result;
  }

  getTotalCartPrice(cartData: any): number {
    let total = 0;
    
    for (let i = 0; i < cartData.length; i++) {
      total += cartData[i].price * cartData[i].quantity;
    }

    return total;
  }

  clerCart() {
    this.updateCart([]);
  }
}
