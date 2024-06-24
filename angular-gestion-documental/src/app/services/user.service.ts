import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { baseUrl } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProfileDTO } from './profile/profile.domain';

//Obtener url dinamicamente en función de la app que llama al componente login
const url = window.location.href;

//Registrar servicio en el root de la app para que otros componentes puedan utilizarlo...
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUserSubject!: BehaviorSubject<IProfileDTO>;
  public currentUser!: Observable<IProfileDTO>;
  user: any | null;
  token: string | null | undefined;
  isSupervisor: boolean | null | undefined;

  constructor(private _http: HttpClient) {
    this.user = localStorage.getItem('user')
    this.token = localStorage.getItem('token')
    this.isSupervisor = localStorage.getItem('role') == 'Supervisor'
  }

  public get currentUserValue(): IProfileDTO {
    return this.currentUserSubject.value;
  }

  beinglogin() {
    return this.token != null && this.token.length > 5 ? true : false;
  }

  login(email: string, password : string): Observable<any> {
    const data = { email: email, password: password}
    return this._http.post(`${baseUrl}/login`, data);
  }

  getIsSupervisor(email: string): Observable<boolean>{
    return this._http.get<boolean>(`${baseUrl}/isSupervisor`, {headers: new HttpHeaders().set('profile', email)});
  }

  getData(){
    let user = this.user ?? localStorage.getItem('user')
    let token = this.token ?? localStorage.getItem('token')
    let isSupervisor = this.isSupervisor != null ? this.isSupervisor : localStorage.getItem('role') == 'Supervisor'
    return{
      user: user,
      token: token,
      isSupervisor: isSupervisor
    }
  }

  saveData(user: string, token: any){
    localStorage.setItem('user',user );
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token
  }
  
  saveSupervisor(isSupervisor: boolean){
    this.isSupervisor = isSupervisor
    if(this.isSupervisor) localStorage.setItem('role', 'Supervisor');
    else localStorage.removeItem('role');
  }

  register(email: string, password : string): Observable<any> {
    const data = { email: email, password: password}
    return this._http.post(`${baseUrl}/register`, data);
  }

  logout() {
    this.user = undefined
    this.token = undefined
    this.isSupervisor = false
    localStorage.clear()
  }

  getUsers(){
    let token = this.token;
    let email = this.user;
    return this._http.get(`${baseUrl}/users`, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

  setSupervisor(idProfile : string, checked: boolean){
    let token = this.token;
    let email = this.user;
    let body = {idProfile, checked}
    return this._http.put(`${baseUrl}/setSupervisor`,body, {headers: new HttpHeaders().set('token', token!).set('profile', email)});
  }

}
