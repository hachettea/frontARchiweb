import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotifsInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.toastr.warning('Oops ! Un erreur est survenue');
        } else {
          switch (error.status) {
            case 401: {
              this.toastr.error("Nom d'utilisateur ou mot de passe incorrect");
              break;
            }
            default: {
              this.toastr.error(
                `Erreur serveur (${error.status} : ${error.statusText})`
              );
              break;
            }
          }
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
