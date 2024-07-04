import { Component, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { ClothesFilterComponent } from "../../widgets/clothes-page/clothes-filter/clothes-filter.component";
import { ClothesFeedComponent } from "../../widgets/clothes-page/clothes-feed/clothes-feed.component";
import { ClothesSortingComponent } from "../../widgets/clothes-page/clothes-sorting/clothes-sorting.component";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-clothes',
    standalone: true,
    templateUrl: './clothes.component.html',
    styleUrl: './clothes.component.scss',
    imports: [ClothesFilterComponent, ClothesFeedComponent, ClothesSortingComponent]
})
export default class ClothesComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

  category: WritableSignal<string> = signal('all');
  pageNumber: WritableSignal<number> = signal(1);
  sortByPrice: WritableSignal<string> = signal('');
  sortByName: WritableSignal<string> = signal('');
  hideOutOfStock: WritableSignal<boolean> = signal(false);

  // constructor() {
  //   effect(() => {
      
  //   })
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category.set(params['category']);
      this.pageNumber.set(params['pageNumber']);
      this.sortByPrice.set(params['sortByPrice']);
      this.sortByName.set(params['sortByName']);
      this.hideOutOfStock.set(params['hideOutOfStock']);
    
      console.log(this.category())
    })
  }
}
