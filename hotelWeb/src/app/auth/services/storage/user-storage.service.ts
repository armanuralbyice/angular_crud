import { Injectable } from '@angular/core';

const USER = 'user';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }
  static getUser(): any{
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }
  static isAdminLogin(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return !!token && role === 'ADMIN';
  }

  static isCustomerLogin(): boolean {
    const token = this.getToken();
    const role = this.getUserRole();
    return !!token && role === 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
