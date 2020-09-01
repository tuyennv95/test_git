import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../app.component';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/internal/Subject';
import {Subscription} from 'rxjs';

enum SidebarTabs {
    NOTIFICATION,
    ACTIVITY
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit, OnDestroy, AfterViewInit {
    environment = environment;
    searchKey = '';

    _unSubscribeAll = new Subject<any>();
    _sub: Subscription;
    fileApi = '';

    @ViewChild('profile')
    profileElement: ElementRef;

    @ViewChild('notification')
    notificationElement: ElementRef;

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    fullName = 'Admin';
    position = 'Quản trị viên';

    showDropdown = {
        subsystem: false,
        userSetting: false,
        rightSidebar: false
    };

    SidebarTabs = SidebarTabs;

    currentSidebarTab: SidebarTabs = SidebarTabs.NOTIFICATION;

    subsystems: any[] = [
        {
            icon: 'usp usp-integration-03',
            title: 'Quản lý NCKH',
        },
        {
            icon: 'usp usp-finance-graph',
            title: 'Quản lý Tài chính',
        },
        {
            icon: 'usp usp-backup-01',
            title: 'QL Hành chính',
        },
        {
            icon: 'usp usp-hr-02',
            title: 'Quản lý Nhân sự',
        }
    ];

    constructor(
        public app: AppComponent,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
        if (+this.userLogin.role === 3) {
            this.fullName = this.userLogin.firstName + " " + this.userLogin.lastName;
            this.position = 'Sinh viên';
        } else if (+this.userLogin.role === 2) {
            this.fullName = this.userLogin.title + ". " + this.userLogin.firstName + " " + this.userLogin.lastName;
            this.position = this.userLogin.position;
        }
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
        this._unSubscribeAll.next();
        this._unSubscribeAll.complete();
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    // Subsystem
    //-------------------

    closeSubsystemsDropdown(event) {
        this.showDropdown.subsystem = false;
    }

    toggleSubsystemsDropdown() {
        this.showDropdown.subsystem = !this.showDropdown.subsystem;
    }

    // user setting
    //-------------------

    closeUserSettingDropdown(event) {
        this.showDropdown.userSetting = false;
    }

    toggleUserSettingDropdown() {
        this.showDropdown.userSetting = !this.showDropdown.userSetting;
    }

    // Sidebar
    //-------------------

    closeRightSidebar(event) {
        this.showDropdown.rightSidebar = false;
    }

    toggleRightSidebar() {
        this.showDropdown.rightSidebar = !this.showDropdown.rightSidebar;
    }
}
