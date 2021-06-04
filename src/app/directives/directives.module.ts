import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDirective } from './alert.directive';



@NgModule({
  declarations: [ AlertDirective ],
  imports: [
    CommonModule
  ],
  exports: [AlertDirective]
})
export class DirectivesModule { }
