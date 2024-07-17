import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent {
  clearCache() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}
