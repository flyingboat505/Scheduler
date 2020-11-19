import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Personal } from './personal.model';

@Injectable()
export class PersonalService {
  selectedPersonal: Personal;
  personals: Personal[];
  readonly baseURL = 'http://localhost:3000/personals';

  constructor(private http: HttpClient) { }

  postPersonal(emp: Personal) {
    return this.http.post(this.baseURL, emp);
  }

  getPersonalList() {
    return this.http.get(this.baseURL);
  }

  putPersonal(emp: Personal) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }


  deletePersonal(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
