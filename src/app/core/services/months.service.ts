import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MonthsApi} from '../http/months-api';
import {IMonth} from '../../shared/interfaces/IMonth';

@Injectable({providedIn: 'root'})

export class MonthsService {

  private _currentMonth: BehaviorSubject<string>;

  constructor(private _monthsApi: MonthsApi) {
    this._currentMonth = new BehaviorSubject<string>('january');
  }

  setCurrentMonth(month: string): void {
    this._currentMonth.next(month);
  }

  getCurrentMonth(): Observable<string> {
    return this._currentMonth.asObservable();
  }

  getMonths(): Observable<IMonth[]> {
    return this._monthsApi.getMonths();
  }

  updatePlans(month: IMonth): Observable<any> {
    return this._monthsApi.updatePlans(month);
  }

}
