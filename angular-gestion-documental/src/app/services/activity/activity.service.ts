import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivityDTO, IActivityResponse } from './activity.domain';
import { UserService } from '../user.service';
import { baseUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  constructor(
    private _http: HttpClient,
    public userService: UserService,
  ) { }

  // TODO: PONER LOS TOKENS DE userService
// Develop

  getAll(): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/allActivities`, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }


  getByCreator(): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/activitiesByCreator`, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

  getPendingActivities(): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/pendingActivities/${email}`, {headers: new HttpHeaders().set('token', token!)});
  }

  getSubmittedActivities(): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/submittedActivities/${email}`, {headers: new HttpHeaders().set('token', token!)});
  }

  

  get(id: any): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/activity/${id}`, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

  getForSupervisor(id: any): Observable<IActivityResponse> {
    let token = this.userService.token;
    let email = this.userService.user;
    return this._http.get<IActivityResponse>(`${baseUrl}/activityForSupervisor/${id}`, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

  create(data: IActivityDTO): Observable<any> {
    let token = this.userService.token;
    let email = this.userService.user;
    let body : any = data
    body['creator'] = email
    return this._http.post<IActivityResponse>(`${baseUrl}/activity`, body, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

  getFiles(id: string){
    let token = this.userService.token;
    return this._http.get(`${baseUrl}/getActivityFiles/${id}`, {headers: new HttpHeaders().set('token', token!)});
  }

  uploadFiles(id: string, formData: any) {
    let token = this.userService.token;
    return this._http.post(`${baseUrl}/uploadActivityFiles/${id}`, formData, {headers: new HttpHeaders().set('token', token!)});
  }

  update(id: number, data: any): Observable<IActivityResponse> {
    let token = this.userService.token;
    data['profile'] = this.userService.currentUser;
    return this._http.put<IActivityResponse>(`${baseUrl}/update/${id}`, data, {headers: new HttpHeaders().set('token', token!)});
  }

  delete(id: number): Observable<IActivityResponse> {
    let token = this.userService.token;
    return this._http.put<IActivityResponse>(`${baseUrl}/deactivate/${id}`, {headers: new HttpHeaders().set('token', token!)});
  }

}
