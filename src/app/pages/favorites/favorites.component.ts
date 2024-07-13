import { Component } from '@angular/core';
import { FavoritesListComponent } from "../../widgets/favorites-page/favorites-list/favorites-list.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [FavoritesListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export default class FavoritesComponent {

}
