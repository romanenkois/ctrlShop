import { Component, input, Input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-clothes-card',
  standalone: true,
  imports: [],
  templateUrl: './clothes-card.component.html',
  styleUrl: './clothes-card.component.scss'
})
export class ClothesCardComponent {
  product: InputSignal<any> = input.required();
}
