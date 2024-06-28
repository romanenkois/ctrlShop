import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./widgets/shared/header/header.component";
import { FooterComponent } from "./widgets/shared/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-header></app-header>
    <router-outlet />
    <app-footer></app-footer>
  `,
    styles: [],
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'ctrlShop';
}
