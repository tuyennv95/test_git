import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {UnauthorizeComponent} from './specific-page/Unauthorize/Unauthorize.component';
import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
import {ErrorPageNotFoundComponent} from './specific-page/not-found/not-found.component';
import {LoginComponent} from './specific-page/login/login.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {AuthGuardLoginService} from './services/auth-guard-login.service';
import {AuthGuardService} from "./services/auth-guard.service";
import {DoiPasswordComponent} from './layouts/doi-password/doi-password.component';


export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'tai-lieu',
                pathMatch: 'full'
            },
            {
                path: 'doi-password',
                component: DoiPasswordComponent
            },
            {
                path: 'client-template',
                loadChildren: './client-template/client-template.module#ClientTemplateModule'
            },
            {
                path: 'bo-mon',
                loadChildren: './modules/bo-mon/bo-mon.module#BoMonModule'
            },
            {
                path: 'chuyen-nganh',
                loadChildren: './modules/chuyen-nganh/chuyen-nganh.module#ChuyenNganhModule'
            },
            {
                path: 'giang-vien',
                loadChildren: './modules/giang-vien/giang-vien.module#GiangVienModule'
            },
            {
                path: 'mon-hoc',
                loadChildren: './modules/mon-hoc/mon-hoc.module#MonHocModule'
            },
            {
                path: 'tai-lieu',
                loadChildren: './modules/tai-lieu/tai-lieu.module#TaiLieuModule'
            },
            {
                path: 'danh-sach-sinh-vien',
                loadChildren: './modules/danh-sach-sinh-vien/danh-sach-sinh-vien.module#DanhSachSinhVienModule'
            },
            {
                path: 'danh-sach-yeu-cau',
                loadChildren: './modules/danh-sach-yeu-cau/danh-sach-yeu-cau.module#DanhSachYeuCauModule'
            },
            {
                path: 'de-tai-ttcn-kltn',
                loadChildren: './modules/ttcn-kltn/ttcn-kltn.module#TtcnKltnModule'
            },
            {
                path: 'error/404',
                component: ErrorPageNotFoundComponent
            }
        ],
        canActivate: [AuthGuardService]
    },
    {
        path: 'tai-khoan',
        component: LoginLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dang-nhap',
                pathMatch: 'full'
            },
            {
                path: 'dang-nhap',
                component: LoginComponent
            }
        ],
        canActivate: [AuthGuardLoginService]
    },
    {
        path: 'unauthorize',
        component: UnauthorizeComponent
    },
    {
        path: '**',
        redirectTo: 'error/404'
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
