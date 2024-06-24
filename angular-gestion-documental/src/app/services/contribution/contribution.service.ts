import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { baseUrl } from '../../../environments/environment';
import { IContributionDTO, IContributionResponse } from './contribution.domain';

@Injectable({
  providedIn: 'root',
})
export class ContributionService {

  constructor(
    private _http: HttpClient,
    public userService: UserService,
  ) { }


  

  // get(id: any): Observable<IActivityResponse> {
  //   let token = this.userService.token;
  //   return this._http.get<IActivityResponse>(`${baseUrl}/activity/${id}`, {headers: new HttpHeaders().set('token', token!)});
  // }

  create(data: IContributionDTO): Observable<any> {
    let token = this.userService.token;
    let body : any = data
    body['profile'] = this.userService.user
    return this._http.post<IContributionResponse>(`${baseUrl}/contribution`, body, {headers: new HttpHeaders().set('token', token!)});
  }

  delete(id: string|undefined){
    let token = this.userService.token;
    return this._http.delete(`${baseUrl}/contribution/${id}`, {headers: new HttpHeaders().set('token', token!)});
  }

  getFiles(id: string|undefined){
    let token = this.userService.token;
    return this._http.get(`${baseUrl}/getContributionFiles/${id}`, {headers: new HttpHeaders().set('token', token!)});
  }

  uploadFiles(id: string, formData: any) {
    let token = this.userService.token;
    return this._http.post(`${baseUrl}/uploadContributionFiles/${id}`, formData, {headers: new HttpHeaders().set('token', token!)});
  }

  // update(id: number, data: any): Observable<IActivityResponse> {
  //   let token = this.userService.token;
  //   data['profile'] = this.userService.currentUser;
  //   return this._http.put<IActivityResponse>(`${baseUrl}/update/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
  // }

  // delete(id: number): Observable<IActivityResponse> {
  //   let token = this.userService.token;
  //   return this._http.put<IActivityResponse>(`${baseUrl}/deactivate/${id}`, {headers: new HttpHeaders().set('token', token!)});
  // }

}
