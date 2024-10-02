import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent implements OnInit {
  private router = inject(Router);
  
  authService: AuthorizationService = inject(AuthorizationService);

  userData = computed(() => this.authService.userData());

  signOut() {
    this.authService.signOut();
  }
  
  ngOnInit() {
    console.log('User component initialized');
    console.log(this.userData());
    if (!this.userData().name) {
      this.router.navigate(['/login']);
    }
  }
}
