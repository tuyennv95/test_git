import {Component, AfterViewInit, Renderer2, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {MessageService, ScrollPanel} from 'primeng/primeng';
import {Subject} from 'rxjs/internal/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthenticationService} from './services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;
    private _sub: Subscription;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    // chế độ mở rộng trang
    pageContentExpansionModeActive: boolean;

    pageLoaded = false;

    // @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

    // index của "nhóm menu item" (menu level 0) hiện đang activated
    activatedMenuGroupIndex: number;

    isMenuClicked: boolean = false;

    appMenuModel: any[];

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        private auth: AuthenticationService,
        private _activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private _router: Router,
    ) {
        // localStorage.removeItem('userLogin');
    }

    ngAfterViewInit() {
        // setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    ngOnInit() {
        this.appMenuModel = [
            {
                label: 'Mục Tài liệu',
                items: [
                    {
                        label: 'Danh sách bộ môn',
                        icon: 'ci ci-parent-child',
                        trangThai: 1,
                        routerLink: 'bo-mon'
                    },
                    {
                        label: 'Danh sách chuyên ngành',
                        icon: 'ci ci-chart-network',
                        trangThai: 1,
                        routerLink: 'chuyen-nganh'
                    },
                    {
                        label: 'Danh sách môn học',
                        icon: 'ci ci-data-base',
                        trangThai: 1,
                        routerLink: 'mon-hoc'
                    },
                    {
                        label: 'Danh sách Giảng viên',
                        icon: 'ci ci-events',
                        trangThai: 1,
                        routerLink: 'giang-vien'
                    },
                    {
                        label: 'Danh sách tài liệu',
                        icon: 'ci ci-share-knowledge',
                        trangThai: 1,
                        routerLink: 'tai-lieu'
                    },
                    {
                        label: 'Đề tài TTCN - KLTN tham khảo',
                        icon: 'ci ci-idea',
                        trangThai: 1,
                        routerLink: 'de-tai-ttcn-kltn'
                    },
                ],
                trangThai: 1,
            },
            {
                label: 'Các mục khác',
                items: [
                    {
                        label: 'Danh sách Sinh viên',
                        icon: 'ci ci-events-alt',
                        trangThai: 1,
                        routerLink: 'danh-sach-sinh-vien'
                    },
                    {
                        label: 'Danh sách yêu cầu',
                        icon: 'ci ci-document',
                        trangThai: 1,
                        routerLink: 'danh-sach-yeu-cau'
                    }
                ],
                trangThai: 1,
            },
        ];
    }

    onMenuCollapseToggleClick() {
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }
    }

    onSwitchModule() {
        // this._activatedRoute.(['']);
        console.log('click logo');
    }

    onChangePassword(event) {
        // event.preventDefault();
        // this._userService.getId()
        //     .then(response => {
        //         this.changePassword.showPopup(response);
        //     });
    }

    onTopbarLogout() {
        // this._authenService.logout();
        this.auth.logout();
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._sub.unsubscribe();
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    togglePageContentExpansionMode() {
        this.pageContentExpansionModeActive = !this.pageContentExpansionModeActive;
    }

    showSuccess() {
        this.messageService.add({
            key: 'success-warn',
            severity: 'success',
            summary: 'Thành công',
            detail: 'Thông báo kết quả thành công của các thao tác'
        });
    }

    showWarn() {
        this.messageService.add({
            key: 'success-warn',
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: 'Cảnh báo thao tác thực hiện làm thay đổi, ' +
                ' cập nhật dữ liệu tuy nhiên không nguy hiểm tới hệ thống'
        });
    }

    showError() {
        this.messageService.add({
            key: 'error',
            severity: 'error',
            summary: 'Có lỗi xảy ra',
            detail: 'Hành độc thông báo lỗi thao tác thực hiện có vấn đề nghiêm trọng ' +
                '\n\n10:00 - 07/05/-2019'
        });
    }
}

