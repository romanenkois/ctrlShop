import { Component } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { SecondStepComponent } from "./ui/second-step/second-step.component";
import { ThirdStepComponent } from "./ui/third-step/third-step.component";
import { FourthStepComponent } from "./ui/fourth-step/fourth-step.component";
import { FifthStepComponent } from "./ui/fifth-step/fifth-step.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent, SecondStepComponent, ThirdStepComponent, FourthStepComponent, FifthStepComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
createOrder() {
throw new Error('Method not implemented.');
}
  hideFirstStep = false;
  hideSecondStep = false;
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
}
