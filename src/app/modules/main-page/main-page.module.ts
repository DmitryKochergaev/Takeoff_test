import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ROUTE} from '../../shared/routes/routes';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: 'add',
    loadChildren: () => import('../add-page/add-page.module').then(m => m.AddPageModule),
  }
];

@NgModule({
  declarations: [MainPageComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class MainPageModule {
}
