import { Component } from '@angular/core';
import { FavoritesListComponent } from '@widgets';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FavoritesListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export default class FavoritesComponent {}
