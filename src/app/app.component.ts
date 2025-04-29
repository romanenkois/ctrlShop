import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@widgets';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  title = 'ctrlShop';
}
