import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonthsService} from '../../core/services/months.service';
import {IDay, IMonth} from '../../shared/interfaces/IMonth';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ROUTE} from '../../shared/routes/routes';
import {ChangeMonthComponent} from './change-month/change-month.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  month: IMonth;
  loading: boolean;
  showDay: boolean;
  day: IDay;
  private _currentMonth: string;
  private _notifier: Subject<any>;

  constructor(private _monthsService: MonthsService,
              private _dialog: MatDialog,
              private _authService: AuthService,
              private _router: Router) {
    this.loading = true;
    this.showDay = false;
    this._notifier = new Subject();

  }

  ngOnInit(): void {
    this._monthsService.getCurrentMonth()
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe({
        next: val => {
          this._currentMonth = val;
          this._monthsService.getMonths()
            .pipe(
              takeUntil(this._notifier)
            )
            .subscribe({
              next: value => {
                this.month = value.filter(month => month.name === this._currentMonth).pop();
              },
              complete: () => {
                this.loading = false;
              }
            });
        }
      });
  }

  onDayClicked(day: IDay): void {
    this.day = day;
    this.showDay = true;
  }

  onEditClicked(day: IDay): void {
    this._router.navigate([ROUTE.main, day.day, ROUTE.edit]);
  }

  onClearClicked(day: IDay): void {
    this.month.days[day.day - 1].plans = null;
    this._monthsService.updatePlans(this.month)
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe();
  }

  onUserClicked(): void {
    this._router.navigate([ROUTE.main, ROUTE.user]);
  }

  onChangeMonthClicked(): void {
    this._dialog.open(ChangeMonthComponent);
  }

  onLogoutClicked(): void {
    this._authService.logout();
    this._router.navigate([ROUTE.authPage]);
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
