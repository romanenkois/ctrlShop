import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  redirectTo(url: string) {
    window.location.href = url;
  }

  copyText(textToCopy: string) {
    navigator.clipboard.writeText(textToCopy);
  }
}
