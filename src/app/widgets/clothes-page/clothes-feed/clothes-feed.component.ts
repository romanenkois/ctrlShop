import { Component, effect, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { clothesService } from './api/clothes.service';
import { ClothesCardComponent } from "./ui/clothes-card/clothes-card.component";

@Component({
  selector: 'app-clothes-feed',
  standalone: true,
  imports: [ClothesCardComponent],
  templateUrl: './clothes-feed.component.html',
  styleUrl: './clothes-feed.component.scss'
})
export class ClothesFeedComponent {
  private clothesService: clothesService = inject(clothesService);

  category: InputSignal<string> = input.required();
  pageNumber: InputSignal<number> = input.required();
  sortByName: InputSignal<string> = input.required();
  sortByPrice: InputSignal<string> = input.required();
  hideOutOfStock: InputSignal<string> = input.required();

  clothesList: WritableSignal<any> = signal([{}, {}, {}]);
  itemsCount: WritableSignal<number> = signal(0);

  constructor() {
    effect(() => {
      let sorting = '';
      if (this.sortByName() == 'ascending') {
        sorting = 'name-asc';
      } else if (this.sortByName() == 'descending') {
        sorting = 'name-desc';
      } else if (this.sortByPrice() == 'ascending') {
        sorting = 'price-asc';
      } else if (this.sortByPrice() == 'descending') {
        sorting = 'price-desc';
      }
      console.log(sorting)
      console.log(this.sortByName())

      this.clothesService.getClothesData(this.category(), this.pageNumber(), sorting).subscribe(
        response => {
          this.clothesList.set(response['result']);
          this.itemsCount.set(response['itemsCount']);
        }
      )
    })
  }
}
