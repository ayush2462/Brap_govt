import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const AUTH_KEY = 'brap_logged_in';
const NAME_KEY = 'brap_user_name';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(
    sessionStorage.getItem(AUTH_KEY) === 'true'
  );
  private _userName = new BehaviorSubject<string>(
    sessionStorage.getItem(NAME_KEY) || 'Admin'
  );

  isLoggedIn$ = this._isLoggedIn.asObservable();
  userName$ = this._userName.asObservable();

  get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  get userName(): string {
    return this._userName.value;
  }

  login(name: string = 'Admin'): void {
    sessionStorage.setItem(AUTH_KEY, 'true');
    sessionStorage.setItem(NAME_KEY, name);
    this._isLoggedIn.next(true);
    this._userName.next(name);
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(NAME_KEY);
    this._isLoggedIn.next(false);
    this._userName.next('');
  }
}
