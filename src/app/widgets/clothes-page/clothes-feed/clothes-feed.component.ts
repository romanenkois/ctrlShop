import { Component, effect, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { clothesService } from './api/clothes.service';
import { ClothesCardComponent } from "./ui/clothes-card/clothes-card.component";

@Component({
  selector: 'app-clothes-feed',
  standalone: true,
  imports: [ClothesCardComponent],
  templateUrl: './clothes-feed.component.html',
  styleUrl: './clothes-feed.component.scss'
})
export class ClothesFeedComponent implements OnInit {
  private clothesService: clothesService = inject(clothesService);

  category: InputSignal<string> = input.required();
  pageNumber: InputSignal<number> = input.required();
  sortByName: InputSignal<string> = input.required();
  sortByPrice: InputSignal<string> = input.required();
  hideOutOfStock: InputSignal<string> = input.required();

  clothesList: WritableSignal<any> = signal(null);

  constructor() {
    effect(() => {
      this.clothesService.getClothesData(this.category()).subscribe(
        response => {
          this.clothesList.set(response);
          console.log(response);
        }
      )
    })
  }

  ngOnInit() {
    
  }
}
