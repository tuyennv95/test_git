import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {Globals} from '../../../base/globals';
import {DocumentRequestControllerService} from "../../../swagger/api/documentRequestController.service";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'modal-duyet-yeu-cau',
    templateUrl: './duyet-yeu-cau.component.html',
    styleUrls: ['duyet-yeu-cau.component.scss']
})

export class DuyetYeuCauComponent extends SecondPageEditBase implements OnInit {
    title = "Duyệt Yêu cầu";

    userLogin = JSON.parse(localStorage.getItem('userLogin'));
    status_options: any[] = [];

    constructor(
        protected _injector: Injector,
        private documentRequestControllerService: DocumentRequestControllerService,
        private notificationFunction: NotificationFunction,
        private globals: Globals
    ) {
        super(_injector);
    }

    onShowPopup(data: any) {
        this.onReset();

        this.onBeforeShowPopUp(data);
    }

    onBeforeShowPopUp(data) {
        this.itemDetail = data;

        console.log("data:", data);

        this.status_options = [];
        for (const property in this.globals.STATUS) {
            this.status_options.push({label: this.globals.STATUS[property], value: property});
        }

    }

    onSave() {
        this.documentRequestControllerService.updateDocumentRequestUsingPUT(this.itemDetail).subscribe(resut => {
            if (resut) {
                if (resut) {
                    this.notificationFunction.sendNotification('/danh-sach-yeu-cau', this.itemDetail.studentCode, 'Admin đã duyệt một số yêu cầu tài liệu của bạn', 3);
                    this.closePopupMethod(resut);
                }
                this.closePopupMethod(resut);
            }
        });
    }
}
