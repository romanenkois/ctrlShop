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
  completedFirstStep = computed(() => {
    return this.cartService.cartSignal().length > 0;
  });
  completedSecondStep = computed(() => {
    return this.customerData.valid;
  })
  completedThirdStep = computed(() => {
    return this.deliveryData.valid;
  });
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
        if (this.completedFirstStep()) {  
          this.hideSecondStep = false;
        }
        break;
      case 3:
        if (this.completedSecondStep()) {
          this.hideThirdStep = false;
        }
        break;
      case 4:
        if (this.completedThirdStep()) {
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
    if (
    this.completedFirstStep()
    && this.completedSecondStep()
    && this.completedThirdStep()
    && this.completedFourthStep()
    && this.notSendingOrder()) {

      this.notSendingOrder.set(false);

      this.uploadService.uploadOrder(
        new Date().toISOString(),
        '1',
        this.cartService.getSimpleCartData(),
        this.customerData.value,
        this.deliveryData.value,
        this.extraData.value ? this.extraData.value : {}
      ).subscribe(() => {
        window.alert('ваше замовлення прийнято\nдякуємо!!');
        this.cartService.clearCart();
        window.location.href = '/';
      });

    } else if (!this.completedFirstStep()) {
      window.alert('чєл, корзина пуста');
    } else {
      window.alert('заповни всі поля попуск');
    }
  }
}
