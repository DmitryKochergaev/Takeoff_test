import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {IUser} from '../../shared/interfaces/IUser';
import {Router} from '@angular/router';
import {ROUTE} from '../../shared/routes/routes';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  captcha: number;
  answer: number;
  user: IUser;
  isHuman: boolean;
  form: FormGroup;
  private _notifier: Subject<any>;


  constructor(private _userService: UserService,
              private _router: Router,
              private _authService: AuthService) {
    this.answer = 13;
    this.isHuman = false;
    this._notifier = new Subject();

  }

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.form = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onCaptcha(): void {
    if (this.captcha === this.answer) {
      this.isHuman = true;
    }
  }

  onCancel(): void {
    this._router.navigate([ROUTE.main]);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this._userService.updateUser({
        ...this.form.value,
        id: this.user.id
      })
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe({
          complete: () => this._router.navigate([ROUTE.main])
        });

    }
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
