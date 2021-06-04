import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Alert } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  alert: Alert = { show: false };
  private $touched: Subscription;

  get isValidFname(): boolean {
    return !(this.registerForm.get('fname').touched && this.registerForm.get('fname').errors && this.registerForm.get('fname').errors.required);
  }

  get isValidLname(): boolean {
    return !(this.registerForm.get('lname').touched && this.registerForm.get('lname').errors && this.registerForm.get('lname').errors.required);
  }

  constructor( private _formBuilder: FormBuilder, private _toastrService: NbToastrService ) { }

  ngOnInit(): void {
    this._initForms();
    this.registerForm.valueChanges.subscribe( res => {
      this.verifyAlert();
    });
  }

  private _initForms(): void {
    this.registerForm = this._formBuilder.group({
      fname:  ['', Validators.required],
      lname: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

  showToast(position, title, message, status) {
    this._toastrService.show(
      message || 'Warning',
      title,
      { position, status });
  }

  verifyAlert() {
    if(!this.isValidFname) {
      this.alert = { show: true, status: "danger", message: 'El nombre es obligatorio.' }
      return;
    }else {
      this.alert = { show: false };
    }
  }
  

}
