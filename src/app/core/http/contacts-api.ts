import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IContact} from '../../shared/interfaces/IContact';

@Injectable({providedIn: 'root'})

export class ContactsApi {
  private _contactsUrl: string;

  constructor(private _http: HttpClient) {
    this._contactsUrl = 'api/contacts';
  }

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(this._contactsUrl);
  }

  deleteById(id: string): Observable<any> {
    return this._http.delete(`${this._contactsUrl}/${id}`);
  }

  addContact(contactData: IContact): Observable<any> {
    console.log(contactData);
    return this._http.post(this._contactsUrl, contactData);
  }

}
