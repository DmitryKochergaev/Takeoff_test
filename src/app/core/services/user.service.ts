import {Injectable} from '@angular/core';
import {UserApi} from '../http/user-api';
import {Observable} from 'rxjs';
import {IUser} from '../../shared/interfaces/IUser';

@Injectable({providedIn: 'root'})

export class UserService {

  constructor(private _userApi: UserApi) {
  }

  getUsers(): Observable<IUser[]> {
    return this._userApi.getUsers();
  }

  updateUser(user: IUser): Observable<any> {
    return this._userApi.updateUser(user);
  }
}
