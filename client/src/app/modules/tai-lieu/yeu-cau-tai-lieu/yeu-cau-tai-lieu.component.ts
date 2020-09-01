import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {DocumentRequestControllerService} from "../../../swagger/api/documentRequestController.service";
import {Notification} from "../../../swagger/model/notification";
import {NotificationControllerService} from "../../../swagger/api/notificationController.service";
import {Globals} from "../../../base/globals";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'modal-yeu-cau-tai-lieu',
    templateUrl: './yeu-cau-tai-lieu.component.html',
    styleUrls: ['/yeu-cau-tai-lieu.component.scss']
})

export class YeuCauTaiLieuComponent extends SecondPageEditBase implements OnInit {
    title = "Yêu cầu tài liệu";

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        protected _injector: Injector,
        private documentRequestControllerService: DocumentRequestControllerService,
        private notificationFunction: NotificationFunction,
        public globals: Globals
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        this.onReset();
        this.onBeforeShowPopUp(data);
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.title) {
            this.itemDetail.studentCode = this.userLogin.studentCode;
            this.itemDetail.status = 2;

            this.documentRequestControllerService.createDocumentRequestUsingPOST(this.itemDetail).subscribe(resut => {
                this.notificationFunction.sendNotification('/danh-sach-tai-lieu', 'admin', 'Có sinh viên yêu cầu tài liệu', 5);
                this.closePopupMethod(resut);
            });
        }
    }
}
