import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {
    LecturerSubjectControllerService
} from "../../../swagger";
import {Globals} from '../../../base/globals';
import {DocumentControllerService} from "../../../swagger/api/documentController.service";
import {UploadService} from "../../../services/upload.service";
import {FileManagerControllerService} from "../../../swagger/api/fileManagerController.service";

@Component({
    selector: 'modal-xem-truoc-file',
    templateUrl: './xem-truoc-file.component.html',
    styleUrls: ['/xem-truoc-file.component.scss']
})

export class XemTruocFileComponent extends SecondPageEditBase implements OnInit {
    title;
    doc = 'http://localhost:9999/api/file-manager/download/';

    constructor(
        protected _injector: Injector,
        public globals: Globals
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        this.onReset();

        this.title = "Xem trước file: " + this.getFileName(data.file);
        this.doc += data.id;

        this.onBeforeShowPopUp(data);
    }

    onBeforeShowPopUp(data) {
        this.itemDetail = data;

        console.log("data:", data);
    }

    getFileName(path) {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === '/') {
                return path.slice(i + 1, path.length);
            }
        }
    }
}
