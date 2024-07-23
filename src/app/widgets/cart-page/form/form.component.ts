import { Component, inject } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { CartService } from '../../../shared/cart/cart.service';
import { FormControl } from '@angular/forms';

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

  completedFirstStep = false;
  completedSecondStep = false;
  completedThirdStep = false;
  completedFourthStep = false;

  inputName = new FormControl('');

  customerData = {
    name: '',
    phone: '',
    email: ''
  }
  deliveryData = {
    country: '',
    city: '',
    address: ''
  }
  paymentData = {
    cardNumber: '',
    cardDate: '',
    cardCVC: ''
  }
  extraData = {
    promoCode: '',
    comment: ''
  }
  
  openNextStep(step: number) {
    switch (step) {
      // case 1: // isn`t used
      //   this.hideFirstStep = false;
      //   break;
      case 2:
        this.hideSecondStep = false;
        break;
      case 3:
        this.hideThirdStep = false;
        break;
      case 4:
        this.hideFourthStep = false;
        break;
      case 5:
        this.hideFifthStep = false;
        break;
    }
  }

  createOrder() {
    window.alert('замовлення (не) створено\nдев давн ще не доробив');
    this.cartService.clerCart();
    window.location.href = '/';
  }
}
