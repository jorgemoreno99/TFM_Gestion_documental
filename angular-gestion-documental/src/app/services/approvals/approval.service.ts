import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { baseUrl } from '../../../environments/environment';
import { IApprovalDTO, IApprovalResponse } from './approval.domain';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {

  constructor(
    private _http: HttpClient,
    public userService: UserService,
  ) { }


  create(data: IApprovalDTO): Observable<any> {
    let token = this.userService.token;
    let email = this.userService.user;
    let body : any = data
    body['profile'] = this.userService.user
    return this._http.post(`${baseUrl}/approval`, body, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

}
