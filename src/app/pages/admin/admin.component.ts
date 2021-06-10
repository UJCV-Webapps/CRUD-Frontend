import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { UserInfinite, User } from '../../interfaces/user.interface';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { environment } from 'src/environments/environment';
import { JobService } from '../../service/job.service';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  employees: Employee[];

  page: number = 1;

  pageSize: number = 10;

  loading: boolean = true;

  empty: boolean = false;

  imgPreview: string;

  jobs: Job[] = [];

  jobSelect: number;

  selectedEmployee: Employee = { employee_id: 0, first_name: '', last_name: '', salary: 0, profile: '', job_title: '', email: '', phone_number: '', hire_date: new Date(), job_id: 0 };

  constructor( private _searchService: NbSearchService, private _employeeService: EmployeeService, private _toastrService: NbToastrService, private _jobService: JobService ) {
  } 

  ngOnInit(): void {
    this._searchService.onSearchSubmit().subscribe( ({ term }) => {
      console.log(term);
      this._employeeService.getEmployee( term ).subscribe( res => {
        this.employees = res;
      }, err => {
        this.showToast('bottom-right', 'Error', err.error.error, 'danger');
      })
    });
    this.getEmployees();
    this._jobService.getJobs().subscribe( res => {
      this.jobs = res;
    });
  }

  @ViewChild('openDialog') openDialog: ElementRef;
  @ViewChild('preview') preview: ElementRef;

  loadNext() {
    if (this.loading || this.empty) { return }

    this.loading = true;

    this._employeeService.getEmployees(this.page + 1).subscribe( res => {
      console.log(this.page);
      if(res.length > 0){
        this.employees = [...this.employees, ...res]
        this.page++;
      }else {
        this.empty = true;
      }
      this.loading = false;
    });
  }

  onSelectEmployee( employee_id: number ): void {
    this.selectedEmployee = this.employees.filter( employee => employee.employee_id === employee_id )[0];
    this.jobSelect = this.selectedEmployee.job_id;
  }

  
  onDelete(): void {
    this._employeeService.deleteEmployee( this.selectedEmployee.employee_id ).subscribe( res => {
      this.employees = this.employees.filter( e => e.employee_id !== this.selectedEmployee.employee_id);
      this.showToast('bottom-right', 'Correcto', res.msg, 'success');
      this.selectedEmployee = { employee_id: 0, first_name: '', last_name: '', salary: 0, profile: undefined, job_title: '', email: '', phone_number: '', hire_date: new Date() };
      this.getEmployees();
      this.page = 1;
      this.empty = false;
    }, err => {
      const { error } = err;
      console.log(err);
      this.showToast('bottom-right', 'Error', error.error, 'danger');
    });
  }

  //Utils
  showToast(position, title, message, status) {
    this._toastrService.show(
      message || 'Warning',
      title,
      { position, status });
  }

  getProfile(path: string): string {
    return `${environment.api_url_base}/${path}`;
  }

  getFullName(fname: string, lname: string): string {
    return `${fname} ${lname}`;
  }

  onChangeImage(e) {
    const reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgPreview = reader.result as string;
        this.preview.nativeElement.src = this.imgPreview;
      }
    }
  }

  onOpenDialog() {
    this.openDialog.nativeElement.click();
  }

  clear() {
    this.imgPreview = undefined;
  }

  onUpdate() {
    const updateEmployee: Employee = {...this.selectedEmployee}; 
    if(this.imgPreview) {
      updateEmployee.profile = this.imgPreview;
    }else {
      if(updateEmployee.profile === "assets/profiles/default.jpg") {
        delete updateEmployee.profile;
      }else {
        updateEmployee.profile = 'ready';
      }
    }
    console.log(updateEmployee);
    this._employeeService.updateEmployee(updateEmployee).subscribe( res => {
      this.imgPreview = undefined;
      this.getEmployees();
      this.showToast('bottom-right', 'Correcto', 'Datos actualizados correctamente', 'success');
    }, err => {
      const { error } = err;
      this.showToast('bottom-right', 'Error', error.error, 'danger');
      console.log(err);
    })
  }

  getEmployees(): void {
    console.log('Get Employees');
    this._employeeService.getEmployees(this.page).subscribe( res => {
      this.loading = false;
      this.employees = res;
    });
  }

  onSelectChange(e){
    this.selectedEmployee.job_id = e;
  }
}
