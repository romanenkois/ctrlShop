import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clothes-filter',
  standalone: true,
  imports: [],
  templateUrl: './clothes-filter.component.html',
  styleUrl: './clothes-filter.component.scss'
})
export class ClothesFilterComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router)

  changeCategory(category: string) {
    this.router.navigate(['./clothes'], { queryParams: { category: category } });
  }
}
