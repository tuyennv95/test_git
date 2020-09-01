import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {DocumentRequestControllerService} from "../../../swagger/api/documentRequestController.service";
import {NotificationControllerService} from "../../../swagger/api/notificationController.service";
import {Globals} from "../../../base/globals";
import {Notification} from "../../../swagger/model/notification";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'modal-update-ds-yeu-cau',
    templateUrl: './update-danh-sach-yeu-cau.component.html',
    styleUrls: ['/update-danh-sach-yeu-cau.component.scss']
})

export class UpdateDanhSachYeuCauComponent extends SecondPageEditBase implements OnInit {
    title = "Yêu cầu tài liệu";

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        protected _injector: Injector,
        private documentRequestControllerService: DocumentRequestControllerService,
        public notificationFunction: NotificationFunction
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

    onDelete(id) {
        if (id) {
            this.documentRequestControllerService.deleteDocumentRequestUsingPOST([id]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
