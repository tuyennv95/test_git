import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {
    LecturerSubjectControllerService
} from "../../../swagger";
import {Globals} from '../../../base/globals';
import {DocumentControllerService} from "../../../swagger/api/documentController.service";
import {UploadService} from "../../../services/upload.service";
import {FileManagerControllerService} from "../../../swagger/api/fileManagerController.service";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'modal-duyet-ttcn-kltn',
    templateUrl: './duyet-ttcn-kltn.component.html',
    styleUrls: ['/duyet-ttcn-kltn.component.scss']
})

export class DuyetTtcnKltnComponent extends SecondPageEditBase implements OnInit {
    title = "Duyệt tài liệu";

    userLogin = JSON.parse(localStorage.getItem('userLogin'));
    status_options: any[] = [];

    constructor(
        protected _injector: Injector,
        private documentControllerService: DocumentControllerService,
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
        this.itemDetail.userupdated = this.userLogin.lecturerCode;
        this.itemDetail.dateUpdated = new Date();

        this.documentControllerService.updateDocumentUsingPUT(this.itemDetail).subscribe(resut => {
            if (resut) {
                if (resut) {
                    this.notificationFunction.sendNotification('/de-tai-ttcn-kltn', this.itemDetail.lecturerCode, 'Admin đã duyệt một số đề tài của bạn', 2);
                    this.closePopupMethod(resut);
                }
                this.closePopupMethod(resut);
            }
        });
    }
}
