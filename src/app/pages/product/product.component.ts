import { Component } from '@angular/core';
import { ShowcaseComponent } from "../../widgets/product-page/showcase/showcase.component";
import { ReviewsComponent } from "../../widgets/product-page/reviews/reviews.component";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [ShowcaseComponent, ReviewsComponent]
})
export default class ProductComponent {

}
