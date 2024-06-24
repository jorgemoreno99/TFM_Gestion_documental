import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      console.log("intercepting and adding token");

      request = request.clone({
        setHeaders: {
          token: authToken
        }
      });
    }


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }), catchError((error:HttpErrorResponse) => {

        switch(error.status){
          case 0: {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              showCloseButton: true
            })
            break;
          }
          case 401: {
            Swal.fire({
              title: 'Unauthorized',
              // text: error.err.message,
              icon: 'error',
              showCloseButton: true
            }).then(response => {
              this.router.navigate(['/login']);
            })
            break;
          }
          case 403: {
            Swal.fire({
              title: 'Forbidden',
              text: error.error.message,
              icon: 'error',
              showCloseButton: true
            }).then(response => {
              if(response.value){
                this.router.navigate(['/login']);
              }
            })
            break;
          }
          default: {
            Swal.fire({
              title: 'Error',
              text: error.error.message,
              icon: 'error',
              showCloseButton: true
            })
            break;
          }
        }
        return throwError(error);
      })
    );
  }
}
