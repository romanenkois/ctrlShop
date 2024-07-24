import { Component, effect, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { CartService } from '../../../shared/cart/cart.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadService } from './api/upload.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  
  private cartService: CartService = inject(CartService);
  private uploadService: UploadService = inject(UploadService);  

  hideFirstStep = false;
  hideSecondStep = true;
  hideThirdStep = true;
  hideFourthStep = true;
  hideFifthStep = true;

  completedFirstStep: WritableSignal<boolean> = signal(false);
  completedSecondStep: WritableSignal<boolean> = signal(false);
  completedThirdStep: WritableSignal<boolean> = signal(false);
  completedFourthStep: WritableSignal<boolean> = signal(!false);

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
    && this.completedFourthStep()){

      // console.log(new Date().toISOString())
      // console.log('1')
      // console.log(this.cartService.$cart)
      // console.log(typeof this.cartService.$cart)
      // console.log(this.customerData.value)
      // console.log(typeof this.customerData.value)
      // console.log(this.deliveryData.value)
      // console.log(typeof this.deliveryData.value)
      // console.log(this.extraData.value)
      // console.log(typeof this.extraData.value)

      this.cartService.$cart.subscribe((cart) => {
        this.uploadService.uploadOrder(
          new Date().toISOString(),
          '1',
          cart,
          this.customerData.value,
          this.deliveryData.value,
          this.extraData.value ? this.extraData.value : {}
        ).subscribe(() => {
          window.alert('замовлення успішно відправлено\nдякуємо!!');
          this.cartService.clerCart();
          window.location.href = '/';
        });
      });

    } else if (!this.completedFirstStep()) {
      window.alert('чєл, корзина пуста');
    } else {
      window.alert('заповни всі поля попуск');
    }
  }

  ngOnInit() {
    this.cartService.$cart.subscribe((cart) => {
      if (cart.length) {
        this.completedFirstStep.set(true);
      } else {
        this.completedFirstStep.set(false);
      }
    })

    this.customerData.valueChanges.subscribe(() => {
      if (this.customerData.get('inputName') && this.customerData.get('inputEmail')){
        this.completedSecondStep.set(true);
      } else {
        this.completedSecondStep.set(false);
      }
    });

    this.deliveryData.valueChanges.subscribe(() => {
      if (this.deliveryData.get('inputCountry') && this.deliveryData.get('inputCity') && this.deliveryData.get('inputPostOffice')){
        this.completedThirdStep.set(true);
      } else {
        this.completedThirdStep.set(false);
      }
    });
  }
}
