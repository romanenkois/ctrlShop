import { Component, inject, input, InputSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clothes-sorting',
  standalone: true,
  imports: [],
  templateUrl: './clothes-sorting.component.html',
  styleUrl: './clothes-sorting.component.scss'
})
export class ClothesSortingComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router)

  sortByName: InputSignal<string> = input.required<any>();
  sortByPrice: InputSignal<string> = input.required<any>();
  hideOutOfStock: InputSignal<string> = input.required<any>();

  sortByNameImage = 'icons/general/dash.svg';
  sortByPriceImage = 'icons/general/dash.svg';
  hideOutOfStockImage = 'icons/general/cross.svg';

  sortingByName() {
    if (this.sortByName() == 'ascending') {
      this.router.navigate(['./clothes'], { queryParams: { sortByName: "descending", sortByPrice: null }, queryParamsHandling: 'merge' });
      this.sortByNameImage = 'icons/general/chevron_down.svg';
      this.sortByPriceImage = 'icons/general/dash.svg';
    } else {
      this.router.navigate(['./clothes'], { queryParams: { sortByName: "ascending", sortByPrice: null }, queryParamsHandling: 'merge' });
      this.sortByNameImage = 'icons/general/chevron_up.svg';
      this.sortByPriceImage = 'icons/general/dash.svg';
    }
  }
  sortingByPrice() {
    if (this.sortByPrice() == 'ascending') {
      this.router.navigate(['./clothes'], { queryParams: { sortByPrice: "descending", sortByName: null }, queryParamsHandling: 'merge' });
      this.sortByPriceImage = 'icons/general/chevron_down.svg';
      this.sortByNameImage = 'icons/general/dash.svg';
    } else {
      this.router.navigate(['./clothes'], { queryParams: { sortByPrice: "ascending", sortByName: null }, queryParamsHandling: 'merge' });
      this.sortByPriceImage = 'icons/general/chevron_up.svg';
      this.sortByNameImage = 'icons/general/dash.svg';
    }
  }

  visibilityOutOfStock() {
    if (this.hideOutOfStock() == null) {
      this.router.navigate(['./clothes'], { queryParams: { hideOutOfStock: "hide"}, queryParamsHandling: 'merge' });
      this.hideOutOfStockImage = 'icons/general/check.svg';
    } else {
      this.router.navigate(['./clothes'], { queryParams: { hideOutOfStock: null}, queryParamsHandling: 'merge' });
      this.hideOutOfStockImage = 'icons/general/cross.svg';
    }
    
  }
}
