import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app-content/menu/app.menu.component';
import {AppTopBarComponent} from './app-content/topbar/app.topbar.component';
import {AppFooterComponent} from './app-content/footer/app.footer.component';
import {AppProfileComponent} from './app-content/profile/app.profile.component';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {MessageService} from 'primeng/components/common/messageservice';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {UnauthorizeComponent} from './specific-page/Unauthorize/Unauthorize.component';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
import {ErrorPageNotFoundComponent} from './specific-page/not-found/not-found.component';
import {ToastModule} from "primeng/toast";
import {
    AutoCompleteModule,
    CheckboxModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    ScrollPanelModule
} from 'primeng/primeng';
import {AppMenuSearchBoxComponent} from "./app-content/menu-search-box/app.menu-search-box.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppNotificationComponent} from "./app-content/notification/app.notification.component";
import {LoginComponent} from './specific-page/login/login.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {AuthenticationService} from "./services/authentication.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthGuardLoginService} from "./services/auth-guard-login.service";
import {
    DepartmentControllerService,
    LecturerControllerService, LecturerSubjectControllerService,
    RangeControllerService, StudentControllerService,
    SubjectControllerService, UserControllerService
} from "./swagger";
import {Globals} from "./base/globals";
import {DocumentControllerService} from "./swagger/api/documentController.service";
import {UploadService} from "./services/upload.service";
import {AuthInterceptor} from "./services/auth-interceptor";
import {FileManagerControllerService} from "./swagger/api/fileManagerController.service";
import {CommentControllerService} from "./swagger/api/commentController.service";
import {DocumentReviewControllerService} from "./swagger/api/documentReviewController.service";
import {DocumentRequestControllerService} from "./swagger/api/documentRequestController.service";
import {NotificationControllerService} from "./swagger/api/notificationController.service";
import {NotificationFunction} from "./base/notification-function";
import {DoiPasswordComponent} from './layouts/doi-password/doi-password.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        HttpClientModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ToastModule,
        ConfirmDialogModule,
        OverlayPanelModule,
        AutoCompleteModule,
        FormsModule,
        BrowserAnimationsModule,
        CheckboxModule,
        ScrollPanelModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        LoginLayoutComponent,
        DoiPasswordComponent,
        DefaultLayoutComponent,
        AppNotificationComponent,
        AppMenuSearchBoxComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppProfileComponent,
        UnauthorizeComponent,
        ErrorPageNotFoundComponent,
        LoginComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthenticationService,
        AuthGuardService,
        AuthGuardLoginService,
        MessageService,
        ConfirmationService, DatePipe,

        Globals,
        NotificationFunction,
        UploadService,
        UserControllerService,
        LecturerControllerService,
        DepartmentControllerService,
        RangeControllerService,
        SubjectControllerService,
        LecturerSubjectControllerService,
        DocumentControllerService,
        FileManagerControllerService,
        CommentControllerService,
        DocumentReviewControllerService,
        DocumentRequestControllerService,
        StudentControllerService,
        NotificationControllerService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
