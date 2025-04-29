import { Component } from '@angular/core';
import { FormComponent } from "../../widgets/order-page/form/form.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export default class CartComponent {

}
