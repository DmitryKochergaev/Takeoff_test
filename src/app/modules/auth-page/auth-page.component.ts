import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {ROUTE} from '../../shared/routes/routes';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  hide: boolean;
  private _notifier: Subject<any>;

  constructor(private _userService: UserService,
              private _router: Router,
              private _authService: AuthService) {
    this._notifier = new Subject();
    this.hide = true;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onAuthClick(): void {
    if (this.form.valid) {
      this._userService.getUsers()
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe({
          next: value => {
            value.forEach(user => {
              if (user.userName === this.form.value.userName && user.password === this.form.value.password) {
                this._router.navigate([ROUTE.main]);
                this._authService.login(user);
              }
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
