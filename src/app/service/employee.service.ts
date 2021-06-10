import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private _http: HttpClient ) { }

  saveEmployee( employee: FormData ): Observable<any> {
    const params = new HttpParams().set('method', 'POST');
    return this._http.post<any>(`${environment.api_url_base}/employees.php`, employee, { params } );
  }

  getInactiveEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${environment.api_url_base}/routes/employees/inactive/index.php`);
  }

  activeEmployee( employee_id: number ): Observable<any> {
    const formData = new FormData();
    formData.append('employee_id', employee_id.toString());
    return this._http.post<any>(`${environment.api_url_base}/routes/employees/inactive/index.php`, formData);
  }

  getEmployee( query: any ): Observable<Employee[]> {
    const params = new HttpParams().set('method', 'GET').set('query', query);
    return this._http.get<Employee[]>(`${environment.api_url_base}/employees.php`, { params });
  }

  getEmployees( page: number ): Observable<Employee[]> {
    const params = new HttpParams().set('page', page.toString()).set('method', 'GET');
    return this._http.get<Employee[]>(`${environment.api_url_base}/employees.php`, { params });
  }

  deleteEmployee( employee_id: number ): Observable<any> {
    const params = new HttpParams().set('employee_id', employee_id.toString()).set('delete', 'true').set('method', 'GET');
    return this._http.get<any>(`${environment.api_url_base}/employees.php`, { params });
  }

  updateEmployee( employee: Employee ): Observable<any> {
    const params = new HttpParams().set('method', 'PUT');
    console.log(employee);
    return this._http.post(`${environment.api_url_base}/employees.php`, JSON.stringify(employee), { params });
  }

}
