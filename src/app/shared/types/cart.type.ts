import { Product } from "./product.type";

export type CartItem = {
    item: Product
    quantity: number;   
}

export type Cart = {
    version?: number;
    items: CartItem[];
}

export type CartSimple = {
    items: {
        productId: string;
        productQuantity: number;
    }[]
}