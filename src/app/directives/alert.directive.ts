import { Directive, EventEmitter, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {

  @Output('verifyForm') verifyForm: EventEmitter<any>= new EventEmitter();

  constructor() { }

  @HostListener('mouseover', ['$event'])
  onFocus(event) {
    this.verifyForm.emit();
  }

}
