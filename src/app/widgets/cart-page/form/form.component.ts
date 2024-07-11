import { Component } from '@angular/core';
import { FirstStepComponent } from "./ui/first-step/first-step.component";
import { SecondStepComponent } from "./ui/second-step/second-step.component";
import { ThirdStepComponent } from "./ui/third-step/third-step.component";
import { FourthStepComponent } from "./ui/fourth-step/fourth-step.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FirstStepComponent, SecondStepComponent, ThirdStepComponent, FourthStepComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
createOrder() {
throw new Error('Method not implemented.');
}
  hideFirstStep = false;
  hideSecondStep = true;
  hideThirdStep = true;
  hideFourthStep = true;

  openNextStep() {
    if (this.hideSecondStep) {
      this.hideSecondStep = false;
    } else if (this.hideThirdStep) {
      this.hideThirdStep = false;
    } else if (this.hideFourthStep) {
      this.hideFourthStep = false;
    }
    // if (!this.hideFirstStep) {
    //   this.hideSecondStep == false;
    //   console.log(123)
    // }
  }
}
