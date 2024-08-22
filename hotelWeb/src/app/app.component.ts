import { Component } from '@angular/core';
import {UserStorageService} from './auth/services/storage/user-storage.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotelWeb';
  isCustomerLogin = UserStorageService.isCustomerLogin();
  isAdminLogin = UserStorageService.isAdminLogin();
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCustomerLogin = UserStorageService.isCustomerLogin();
        this.isAdminLogin = UserStorageService.isAdminLogin();
      }
    });
  }
  logOut(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('/');
  }
}
