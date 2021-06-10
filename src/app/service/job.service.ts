import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../interfaces/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor( private _http: HttpClient ) { }

  getJobs(): Observable<Job[]> {
    return this._http.get<Job[]>(`${environment.api_url_base}/jobs.php`);
  }

}
