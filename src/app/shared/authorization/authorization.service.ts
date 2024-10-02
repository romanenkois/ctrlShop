declare var google: any;

import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private router = inject(Router);
  
  public userData: WritableSignal<any> = signal(null);

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleGoogleLogin(res: any) {
    if (res) {
      const payload = this.decodeToken(res.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.loadUserData();
      this.router.navigate(['/user']);
    }  
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.userData.set(null);
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/home']);
  }

  loadUserData() {
    let newUserData: any = {}
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
      if (loggedInUser) {
        newUserData.name = loggedInUser.name;
        newUserData.picture = loggedInUser.picture;
        newUserData.email = loggedInUser.email;
      }
    } catch (error) {
      console.error('Could`t parse user authorization data');
    }
    this.userData.set(newUserData);
  }

  constructor() {
    this.loadUserData();
  }
}
