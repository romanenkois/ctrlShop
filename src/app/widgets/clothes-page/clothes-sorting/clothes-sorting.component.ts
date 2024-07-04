import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clothes-sorting',
  standalone: true,
  imports: [],
  templateUrl: './clothes-sorting.component.html',
  styleUrl: './clothes-sorting.component.scss'
})
export class ClothesSortingComponent {
changeSorting(arg0: string) {
throw new Error('Method not implemented.');
}
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router)

  
}
