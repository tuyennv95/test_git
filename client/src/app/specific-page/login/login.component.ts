import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {UserControllerService} from "../../swagger";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    itemDetail: User = new User();
    error = false;
    luuDangNhap = false;
    submitting;
    formGroup;

    constructor(protected _injector: Injector,
                private formBuilder: FormBuilder,
                private auth: AuthenticationService,
                private UserControllerService: UserControllerService) {
    }

    ngOnInit() {
        this.loadFormGroup();
    }

    loadFormGroup() {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            luuDangNhap: false
        });
    }

    clickLogin() {
        this.submitting = true;

        this.UserControllerService.loginUsingGET(this.itemDetail.username, this.itemDetail.password)
            .subscribe(result => {
                let data = result['result'];

                if (data && data !== 'ERROR') {
                    this.auth.loginSession = true;
                    this.auth.saveToken(result);
                } else {
                    this.error = true;
                }
            });
    }

    onFocus() {
        this.submitting = false;
        this.error = false;
    }
}
