import { Component, inject } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { CartService } from '../../../shared/cart/cart.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private cartService: CartService = inject(CartService);

  hideFirstStep = false;
  hideSecondStep = true;
  hideThirdStep = true;
  hideFourthStep = true;
  hideFifthStep = true;

  

  openNextStep() {
    if (this.hideSecondStep) {
      this.hideSecondStep = false;
    } else if (this.hideThirdStep) {
      this.hideThirdStep = false;
    } else if (this.hideFourthStep) {
      this.hideFourthStep = false;
    } else if (this.hideFifthStep) {
      this.hideFifthStep = false;
    }
  }

  createOrder() {
    window.alert('замовлення (не) створено\nдев давн ще не доробив');
    this.cartService.clerCart();
    window.location.href = '/';
  }
}
