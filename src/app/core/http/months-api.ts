import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IMonth} from '../../shared/interfaces/IMonth';

@Injectable({providedIn: 'root'})

export class MonthsApi {
  private _monthUrl: string;

  constructor(private _http: HttpClient) {
    this._monthUrl = 'api/months';
  }

  getMonths(): Observable<IMonth[]> {
    return this._http.get<IMonth[]>(this._monthUrl);
  }

  updatePlans(month: IMonth): Observable<any> {
    return this._http.patch<IMonth>(`${this._monthUrl}/${month.id}`, month);
  }

  getByName(name: string): Observable<IMonth> {
    return this._http.get<IMonth>(this._monthUrl, {
      params: new HttpParams().set('name', name)
    });
  }

}
