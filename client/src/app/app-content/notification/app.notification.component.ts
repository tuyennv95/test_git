import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {Router} from "@angular/router";
import {NotificationControllerService} from "../../swagger/api/notificationController.service";
import {Globals} from "../../base/globals";
import {AppTopBarComponent} from "../topbar/app.topbar.component";

@Component({
    selector: 'app-notification',
    templateUrl: 'app.notification.component.html'
})
export class AppNotificationComponent implements OnInit {

    model: any[];

    notificationList: any[];

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        public app: AppComponent,
        private appTopBarComponent: AppTopBarComponent,
        private _router: Router,
        private notificationControllerService: NotificationControllerService,
        public globals: Globals
    ) {

    }

    ngOnInit(): void {
        this.loadNotification();
    }

    loadNotification() {
        this.notificationList = [];
        this.model = [
            {
                label: 'Mới',
                items: []
            },
            {
                label: 'Trước đây',
                items: []
            }
        ];

        let user = '';
        if (+this.userLogin.role < 3) {
            user = this.userLogin.lecturerCode
        } else {
            user = this.userLogin.studentCode
        }

        this.notificationControllerService.getNotificationsListUsingPOST({
            'username': user
        }).subscribe(result => {
            if (result) {
                this.notificationList = result;

                console.log(result);

                result.forEach(item => {
                    if (+item.status === 1) {
                        this.model[0].items.push({
                            id: item.id,
                            label: item.content,
                            type: +item.type,
                            unseen: true,
                            time: item.dateCreated,
                            link: item.link
                        });
                    } else {
                        this.model[1].items.push({
                            id: item.id,
                            label: item.content,
                            type: +item.type,
                            unseen: false,
                            time: item.dateCreated,
                            link: item.link
                        });
                    }
                })
            }
        });
    }

    chuyenTrang(item) {
        let tg = this.notificationList.find(aa => aa.id === item.id);

        if (+tg.status === 1) {
            tg.status = 0;
            this.notificationControllerService.updateNotificationUsingPUT([tg]).subscribe(result => {
                if (result) {
                    this.loadNotification();
                }
            });
        }

        this._router.navigate([item.link]);
        this.appTopBarComponent.showDropdown.rightSidebar = false;
    }


    hasChildren() {
        if (this.model) {
            for (let i = 0; i < this.model.length; i++) {
                let item = this.model[i];

                if (item.items) {
                    return true;
                }
            }
        }

        return false;
    }

    // helper
    //------------------------
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomItemFromList(listItem) {
        let index = Math.floor(Math.random() * listItem.length);
        return listItem[index];
    }
}
