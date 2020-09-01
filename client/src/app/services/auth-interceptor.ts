import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {catchError} from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.getToken()) {
            return next.handle(request.clone({
                // headers.
                setHeaders: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + this.auth.getToken()
                }
            }))
        }

        return next.handle(request)
    }
}
