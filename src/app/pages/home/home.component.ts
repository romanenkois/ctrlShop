import { Component } from '@angular/core';
import { BannerComponent } from "../../widgets/home-page/banner/banner.component";
import { ShowcaseComponent } from "../../widgets/home-page/showcase/showcase.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [BannerComponent, ShowcaseComponent]
})
export default class HomeComponent {

}
