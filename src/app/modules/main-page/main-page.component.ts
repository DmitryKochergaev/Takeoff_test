import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {ContactsService} from '../../core/services/contacts.service';
import {IContact} from '../../shared/interfaces/IContact';
import {takeUntil} from 'rxjs/operators';
import {ROUTE} from '../../shared/routes/routes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  private _notifier: Subject<any>;

  contacts: IContact[];

  constructor(private _authService: AuthService,
              private _contactService: ContactsService,
              private _router: Router) {
    this._notifier = new Subject();
  }

  ngOnInit(): void {
    this._contactService.getContacts()
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe(value => this.contacts = value);
  }

  onAddContact(): void {
    this._router.navigate([ROUTE.main, ROUTE.add]);
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }


}
