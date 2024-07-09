import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export default class Error404Component {
  returnBack() {
    window.history.back();
  }

}
