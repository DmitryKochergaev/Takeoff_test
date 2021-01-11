import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IContact} from '../../../shared/interfaces/IContact';
import {ContactsService} from '../../../core/services/contacts.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  @Input() contact: IContact;
  private _notifier: Subject<any>;


  constructor(private _contactService: ContactsService) {
    this._notifier = new Subject();
  }

  ngOnInit(): void {
  }

  onDelete(): void {
    this._contactService.deleteById(this.contact.id)
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }
}
