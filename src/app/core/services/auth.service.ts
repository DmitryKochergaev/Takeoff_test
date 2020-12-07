import {Injectable} from '@angular/core';
import {IUser} from '../../shared/interfaces/IUser';

@Injectable({providedIn: 'root'})

export class AuthService {
  private _user: IUser;

  isAuthenticated(): boolean {
    return !!this._user;
  }

  getUser(): IUser {
    return this._user;
  }

  login(user): void {
    this._user = {
      userName: user.userName,
      password: user.password,
      id: user.id
    };
  }

  logout(): void {
    this._user = null;
  }

}
