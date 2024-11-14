import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { CartService } from '../../../shared/cart/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from './api/upload.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private fb: FormBuilder = inject(FormBuilder);
  
  private cartService: CartService = inject(CartService);
  private uploadService: UploadService = inject(UploadService);  

  // used for styles
  hideFirstStep = false;
  hideSecondStep = true;
  hideThirdStep = true;
  hideFourthStep = true;
  hideFifthStep = true;

  // used for validation 
  completedFourthStep: WritableSignal<boolean> = signal(true); // no payment system yet

  // used to avoid duplicate requests
  notSendingOrder: WritableSignal<boolean> = signal(true);

  customerData: FormGroup = this.fb.group({
    inputName: ['', Validators.required],
    inputEmail: ['', [Validators.required, Validators.email]],
    inputPhone: [''],
  });

  deliveryData: FormGroup = this.fb.group({
    inputCountry: ['', Validators.required],
    inputCity: ['', Validators.required],
    inputPostOffice: ['', Validators.required],
  });

  // is disabled because of no payment system yet
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
        if (this.cartService.getCartData().length > 0) {  
          this.hideSecondStep = false;
        }
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
        if (this.completedFourthStep()) {
          this.hideFifthStep = false;
        }
        break;
    }
  }

  createOrder() {
    // checks if all requirements are met
    if (
    this.cartService.getCartData().length > 0
    && this.customerData.valid
    && this.deliveryData.valid
    && this.completedFourthStep()
    && this.notSendingOrder()) {

      // set to true, so we cant send another request
      this.notSendingOrder.set(false);

      // we send the request using the function from service
      this.uploadService.uploadOrder(
        new Date().toISOString(),
        '1', // user id, not implemented yet
        this.cartService.getSimpleCartData(),
        this.customerData.value,
        this.deliveryData.value,
        this.extraData.value ? this.extraData.value : {}
      ).subscribe(() => {
        window.alert('ваше замовлення прийнято\nдякуємо!!');
        this.cartService.clearCart();
        window.location.href = '/';
      });
    } else if (this.cartService.getCartData().length < 1) {
      window.alert('схоже корзина пуста');
    } else {
      window.alert('спершу необхідно заповнити всі поля');
    }
  }
}
