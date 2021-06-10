import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee.interface';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../service/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.css']
})
export class InactiveComponent implements OnInit {

  inactiveEmployees: Employee[] = [];
  selectedEmployee: Employee = { employee_id: 0, first_name: '', last_name: '', salary: 0, profile: '', job_title: '', email: '', phone_number: '', hire_date: new Date() };
  imgPreview: string;

  getEmployeeFullName( first_name: string, last_name: string ): string {
    return `${first_name} ${last_name}`;
  }

  getEmployeeProfile( path: string ): string {
    return `${environment.api_url_base}/${path}`;
  }

  constructor( private _employeeService: EmployeeService ) { }

  ngOnInit(): void {
    this._employeeService.getInactiveEmployees().subscribe( res => {
      this.inactiveEmployees = res;
    })
  }

  onSelectEmployee( employee_id: number ): void {
    this.selectedEmployee = this.inactiveEmployees.filter( employee => employee.employee_id === employee_id )[0];
  }

  onActiveAccount() {
    Swal.fire({
      html: `<h2 class="alert-color">¿Estas seguro que deseas reactivar al empleado ${this.selectedEmployee.first_name} ${this.selectedEmployee.last_name}?</h2>`,
      showCancelButton: true,
      confirmButtonText: `Si, activar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#36f'
    }).then((result) => {
      if (result.isConfirmed) {
        const { employee_id } = this.selectedEmployee;

        this._employeeService.activeEmployee( employee_id ).subscribe( res => {
          Swal.fire({
            html: `<h2 class="alert-color">Cuenta habilitada correctamente</h2>`,
            confirmButtonText: 'Listo',
            confirmButtonColor: '#36f',
            icon: 'success'
          });
          this.selectedEmployee = { employee_id: 0, first_name: '', last_name: '', salary: 0, profile: '', job_title: '', email: '', phone_number: '', hire_date: new Date() };
          this.inactiveEmployees = this.inactiveEmployees.filter( e => e.employee_id !== employee_id );
        })
      }
    })
  }
}
