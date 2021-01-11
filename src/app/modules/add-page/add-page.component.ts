import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactsService} from '../../core/services/contacts.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ROUTE} from '../../shared/routes/routes';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private _notifier: Subject<any>;

  constructor(private _contactService: ContactsService,
              private _router: Router) {
    this._notifier = new Subject();

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  onAdd(): void {
    this._contactService.addContact(this.form.value)
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe({
        complete: () => this._router.navigate([ROUTE.main])
      });
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
