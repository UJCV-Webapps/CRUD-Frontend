import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSearchModule, NbSidebarModule, NbSpinnerModule, NbToastrModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { InactiveComponent } from './inactive/inactive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    PagesComponent,
    RegisterComponent,
    AdminComponent,
    InactiveComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    ReactiveFormsModule,

    NbLayoutModule,
    NbCardModule,
    NbMenuModule,
    NbSidebarModule,
    NbInputModule,
    NbButtonModule,
    NbToastrModule,
    NbAlertModule,
    NbSearchModule,
    NbTreeGridModule,
    NbListModule,
    NbUserModule,
    NbSpinnerModule,

    DirectivesModule
  ]
})
export class PagesModule { }
