import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {LecturerControllerService, StudentControllerService, UserControllerService} from '../../swagger';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-doi-password',
    templateUrl: './doi-password.component.html',
    styleUrls: ['./doi-password.component.scss']
})
export class DoiPasswordComponent implements OnInit {
    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    itemDetail = {
        username: '',
        password: '',
        passwordMoi: '',
        passwordMoi2: ''

    };
    error = false;
    errorLog = false;
    submitting;
    formGroup;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private formBuilder: FormBuilder,
        private auth: AuthenticationService,
        private lecturerControllerService: LecturerControllerService,
        private studentControllerService: StudentControllerService) {
    }

    ngOnInit() {
        this.loadFormGroup();

        if (+this.userLogin.role === 3) {
            this.itemDetail.username = this.userLogin.studentCode;
        } else {
            this.itemDetail.username = this.userLogin.lecturerCode;
        }
    }

    loadFormGroup() {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            passwordMoi: ['', Validators.required],
            passwordMoi2: ['', Validators.required],
        });
    }

    changePassword() {
        this.submitting = true;

        if (this.itemDetail.passwordMoi === this.itemDetail.passwordMoi2 && this.itemDetail.password === this.userLogin.password) {
            this.userLogin.password = this.itemDetail.passwordMoi;

            if (+this.userLogin.role === 3) {
                this.studentControllerService.updateStudentUsingPUT(this.userLogin).subscribe(result => {
                    if (result === true) {
                        this.app.showSuccess();
                    } else {
                        this.app.showError();
                    }
                });
            } else {
                this.lecturerControllerService.updateLecturerUsingPUT(this.userLogin).subscribe(result => {
                    if (result === true) {
                        this.app.showSuccess();
                    } else {
                        this.app.showError();
                    }
                });
            }
        } else {
            this.errorLog = true;
        }
    }

    nhapPass2() {
        if (this.itemDetail.passwordMoi === this.itemDetail.passwordMoi2 || this.itemDetail.passwordMoi2 === '') {
            return false;
        }

        return true;
    }

    onFocus() {
        this.submitting = false;
        this.error = false;
        this.errorLog = false;
    }
}
