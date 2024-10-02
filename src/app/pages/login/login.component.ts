declare var google: any;

import { Component, inject } from '@angular/core';
import { AuthorizationService } from '../../shared/authorization/authorization.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  authService: AuthorizationService = inject(AuthorizationService);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '414496518092-f3l4erkvc64ihh1snhu9r7ui1go668bn.apps.googleusercontent.com',
      callback: (res: any) => this.authService.handleGoogleLogin(res)
    })

    google.accounts.id.renderButton(
      document.getElementById('google-btn'), {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
      }
    )
  }
}
