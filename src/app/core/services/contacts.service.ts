import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IContact} from '../../shared/interfaces/IContact';
import {switchMap} from 'rxjs/operators';
import {ContactsApi} from '../http/contacts-api';

@Injectable({providedIn: 'root'})

export class ContactsService {

  constructor(private _contactsApi: ContactsApi) {
  }

  getContacts(): Observable<IContact[]> {
    return this._contactsApi.getContacts();
  }

  deleteById(id: string): Observable<any> {
    return this._contactsApi.deleteById(id);
  }

  addContact(contactData: IContact): Observable<any> {
    return this._contactsApi.getContacts()
      .pipe(
        switchMap(contacts => {
          return this._contactsApi.addContact(
            {
              ...contactData,
              id: contacts.reduce((max, min) => max > min ? max : min).id + 1
            }
          );

        })
      );
  }
}
