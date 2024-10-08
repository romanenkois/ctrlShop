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
  sortByName: WritableSignal<string> = signal('');
  sortByPrice: WritableSignal<string> = signal('');
  hideOutOfStock: WritableSignal<string> = signal('');

  filterVisibility = false;
  togleButtonImage = 'icons/general/chevron_right.svg';

  toggleFilter() {
    this.filterVisibility = !this.filterVisibility;
    this.togleButtonImage = this.filterVisibility ? 'icons/general/chevron_left.svg' : 'icons/general/chevron_right.svg';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.category.set(params['category']);
      }
      if (params['pageNumber']) {
        this.pageNumber.set(params['pageNumber']);
      }
      this.sortByName.set(params['sortByName']);
      this.sortByPrice.set(params['sortByPrice']);
      this.hideOutOfStock.set(params['hideOutOfStock']);
    })
  }
}
