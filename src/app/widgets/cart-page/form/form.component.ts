import { Component, inject, input, OnInit } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { CartService } from '../../../shared/cart/cart.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private cartService: CartService = inject(CartService);
  private fb: FormBuilder = inject(FormBuilder);

  hideFirstStep = false;
  hideSecondStep = true;
  hideThirdStep = true;
  hideFourthStep = true;
  hideFifthStep = true;

  customerData: FormGroup = this.fb.group({
    inputName: ['', Validators.required],
    inputEmail: ['', Validators.required],
    inputPhone: ['', Validators.required],
  });

  deliveryData: FormGroup = this.fb.group({
    inputCountry: ['', Validators.required],
    inputCity: ['', Validators.required],
    inputPostOffice: ['', Validators.required],
  });

  paymentData: FormGroup = this.fb.group({
    inputCardNumber: [{value: '', disabled: true}, Validators.required],
    inputCardExpiration: [{value: '', disabled: true}, Validators.required],
    inputCardCVC: [{value: '', disabled: true}, Validators.required],
  });

  extraData: FormGroup = this.fb.group({
    inputPromoCode: [''],
    inputComment: [''],
  });
  
  openNextStep(step: number) {
    switch (step) {
      case 2:
        this.hideSecondStep = false;
        break;
      case 3:
        if (this.customerData.valid) {
          this.hideThirdStep = false;
        }
        break;
      case 4:
        if (this.deliveryData.valid) {
          this.hideFourthStep = false;
        }
        break;
      case 5:
        // if (this.paymentData.valid) {
          this.hideFifthStep = false;
        // }
        break;
    }
  }

  createOrder() {
    if (
    this.customerData.valid
    && this.deliveryData.valid) {

      
      window.alert('замовлення (не) створено\nдев давн ще не доробив');
      // this.cartService.clerCart();
      // window.location.href = '/';
      
    }
    
  }
}
