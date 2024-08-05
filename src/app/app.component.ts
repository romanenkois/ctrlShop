import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./widgets/shared/header/header.component";
import { FooterComponent } from "./widgets/shared/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'ctrlShop';
}
