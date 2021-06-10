import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbToastrModule, NbTooltipModule, NbTreeGridModule, NbUserModule, NbThemeModule, NbToggleModule } from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { InactiveComponent } from './inactive/inactive.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';


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
    FormsModule,

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
    NbSelectModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTooltipModule,
    NbThemeModule,
    NbToggleModule,

    DirectivesModule
  ]
})
export class PagesModule { }
