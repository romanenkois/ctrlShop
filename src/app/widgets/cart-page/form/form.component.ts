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

}
