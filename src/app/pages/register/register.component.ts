import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Alert } from '../../interfaces/alert.interface';
import { EmployeeService } from '../../service/employee.service';
import { JobService } from '../../service/job.service';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  alert: Alert = { show: false };
  loading: boolean = false;
  jobs: Job[] = [];
  selectedItem = 0 ;
  imgPreview: string;

  get isValidFname(): boolean {
    return !(this.registerForm.get('fname').touched && this.registerForm.get('fname').errors && this.registerForm.get('fname').errors.required);
  }

  get isValidLname(): boolean {
    return !(this.registerForm.get('lname').touched && this.registerForm.get('lname').errors && this.registerForm.get('lname').errors.required);
  }

  constructor( private _formBuilder: FormBuilder, private _toastrService: NbToastrService, private _employeeService: EmployeeService, private _jobService: JobService ) { }

  ngOnInit(): void {
    this._initForms();
    this.registerForm.valueChanges.subscribe( res => {
      this.verifyAlert();
    });
    this._jobService.getJobs().subscribe( res => {
      this.jobs = res;
    });
  }

  @ViewChild('openDialog') openDialog: ElementRef;

  private _initForms(): void {
    this.registerForm = this._formBuilder.group({
      fname:  ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      salary: ["", [Validators.required]],
      job_id: ["", [Validators.required]],
      profile: [""]
    })
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.loading = true;
      const data = this.registerForm.value;
      let formData = new FormData();
      formData.append('first_name', data.fname);
      formData.append('last_name', data.lname);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      formData.append('salary', data.salary);
      formData.append('job_id', data.job_id);
      if(this.imgPreview) {
        formData.append('profile', data.profile);
      }
      console.log(data);
      //Enviando la informacion al servicio
      this._employeeService.saveEmployee(formData).subscribe( res => {
        console.log(res);
        const { msg } = res;
        this.loading = false;
        this.registerForm.reset();
        this.imgPreview = null;
        this.showToast('bottom-right', 'Correcto', msg, 'success');
      }, err => {
        const { error } = err;
        console.log(err);
        this.showToast('bottom-right', 'Error', error.error, 'danger');
        this.loading = false;
      })
    }
  }

  onChangeImage(e) {
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgPreview = reader.result as string;
        this.registerForm.patchValue({
          profile: file
        })
      }
    }
  }

  onOpenDialog() {
    this.openDialog.nativeElement.click();
  }

  clear() {
    this.registerForm.reset();
    this.imgPreview = undefined;
  }


  //Utils
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
