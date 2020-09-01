import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
    private token: string;
    loginSession = false;

    constructor(private http: HttpClient, injector: Injector, private router: Router) {
    }

    public saveToken(result): void {
        for (let i = 0; i <= result.user.length; i++) {
            if (result.user[i] === "(") {
                result.user = result.user.slice(i, result.user.length);
                break;
            }
        }

        result.user = result.user.replace('(', '{"');
        result.user = result.user.replace(')', '"}');
        result.user = result.user.replace(/=/g, '": "');
        result.user = result.user.replace(/, /g, '", "');


        localStorage.setItem('userLogin', result.user);
        localStorage.setItem('token', result.result);
        this.token = result.result;

        this.router.navigate(['']);
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    public isLoggedIn(): boolean {
        const user = this.getToken();
        if (user || this.loginSession) {
            return true;
        }
        return false;
    }

    public logout(): void {
        this.loginSession = false;
        this.token = '';
        window.localStorage.removeItem('userLogin');
        window.localStorage.removeItem('token');
        this.router.navigateByUrl('/tai-khoan/dang-nhap');
    }
}
