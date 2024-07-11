import { Component } from '@angular/core';
import { FormComponent } from "../../widgets/cart-page/form/form.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export default class CartComponent {

}
