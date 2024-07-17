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
  itemsCount: WritableSignal<number> = signal(0);

  constructor() {
    effect(() => {
      this.clothesService.getClothesData(this.category(), this.pageNumber()).subscribe(
        response => {
          this.clothesList.set(response['result']);
          this.itemsCount.set(response['itemsCount']);
          // console.log(response);
        }
      )
    })
  }

  ngOnInit() {

    // testing
    // this.clothesList.set(
    
    //   [
    //       {
    //         "_id": "668c09a5c0e1256172e557a9",
    //         "name": "шарффффффф2",
    //         "price": "599",
    //         "description": "мяуууу",
    //         "image": [
    //           "https://ctrl-shop-back.vercel.app/image/668c09a3c0e1256172e557a8"
    //         ],
    //         "category": "scarf"
    //       },
    //       {
    //         "_id": "668eafc365ca4d8aa4e1ae4c",
    //         "name": "тянкошарфф",
    //         "category": "scarf",
    //         "price": "699",
    //         "description": "міяуу мяу мяу",
    //         "image": [
    //           "https://ctrl-shop-back.vercel.app/image/668eafc365ca4d8aa4e1ae4b"
    //         ]
    //       },
    //       {
    //         "_id": "668eafea65ca4d8aa4e1ae4e",
    //         "name": "штани труби",
    //         "category": "pants",
    //         "price": "999",
    //         "description": "типу такий, не такий",
    //         "image": [
    //           "https://ctrl-shop-back.vercel.app/image/668eafe965ca4d8aa4e1ae4d"
    //         ]
    //       },
    //       {
    //         "_id": "668eb00565ca4d8aa4e1ae50",
    //         "name": "зіпка 20221",
    //         "category": "zipka",
    //         "price": "1199",
    //         "description": "вауууууууууууууууууууууу",
    //         "image": [
    //           "https://ctrl-shop-back.vercel.app/image/668eb00565ca4d8aa4e1ae4f"
    //         ]
    //       },
    //       {
    //         "_id": "668eb41065ca4d8aa4e1ae52",
    //         "name": "футболка-мультики",
    //         "category": "tshirt",
    //         "price": "499",
    //         "description": "тудааа попусків",
    //         "image": [
    //           "https://ctrl-shop-back.vercel.app/image/668eb40f65ca4d8aa4e1ae51"
    //         ]
    //       }
    //     ]
    // )
  }
}
