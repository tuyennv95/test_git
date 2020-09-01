import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {Globals} from '../../../base/globals';
import {DocumentControllerService} from "../../../swagger/api/documentController.service";
import {UploadService} from "../../../services/upload.service";
import {FileManagerControllerService} from "../../../swagger/api/fileManagerController.service";
import {Notification} from "../../../swagger/model/notification";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'modal-update-ttcn-kltn',
    templateUrl: './update-ttcn-kltn.component.html',
    styleUrls: ['/update-ttcn-kltn.component.scss']
})

export class UpdateTtcnKltnComponent extends SecondPageEditBase implements OnInit {
    title;

    type_options: any[];
    copyright_options: any[];

    editPage;
    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild('fileUpload') fileUpload;

    constructor(
        protected _injector: Injector,
        private documentControllerService: DocumentControllerService,
        private uploadService: UploadService,
        private notificationFunction: NotificationFunction,
        private fileManagerControllerService: FileManagerControllerService,
        public globals: Globals
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        this.onReset();

        if (data.id) {
            this.title = "Cập nhật Đề tài: " + data.documentName;
            this.editPage = true;
        } else {
            this.title = "Thêm mới Đề tài";
            this.editPage = false;
        }

        this.onBeforeShowPopUp(data);
        this.loadStaticOptions();
        this.loadDynamicOptions();
    }

    onBeforeShowPopUp(data) {
        this.itemDetail = data;
        this.uploadedFiles = [];
        this.itemDetail.files = [];
        this.fileUpload.files = [];

        this.itemDetail.lecturerCode = this.userLogin.lecturerCode;

        if (this.editPage) {
            this.itemDetail.copyrightWarning += '';
        }

        console.log("data:", data);
    }


    loadStaticOptions() {
        this.type_options = [
            {label: '--- Chọn Loại đề tài ---', value: null},
        ];

        this.copyright_options = [
            {label: '--- Cảnh báo tài liệu ---', value: null},
        ];
    }

    loadDynamicOptions() {
        for (const property in this.globals.LOAI_DE_TAI) {
            this.type_options.push({label: this.globals.LOAI_DE_TAI[property], value: property});
        }

        for (const property in this.globals.IS_BAN_QUYEN) {
            this.copyright_options.push({label: this.globals.IS_BAN_QUYEN[property], value: property});
        }

        if (this.itemDetail.id) {
            this.fileManagerControllerService.getFileManagersListUsingPOST({
                'documentId': this.itemDetail.id
            }).subscribe(result => {
                // load các file cũ
                result.forEach(item => {
                    this.uploadedFiles.push(
                        {
                            id: item.id,
                            name: this.getFileName(item.file),
                            file: item.file
                        });
                });

                console.log(this.uploadedFiles)
            })
        }
    }

    onUpload(e) {
        console.log(e);

        this.itemDetail.files = [];

        for (let file of e.files) {
            this.itemDetail.files.push(file);

            // let reader = new FileReader();
            // reader.onload = this._handleReaderLoaded.bind(this);
            // reader.readAsDataURL(file);
        }
    }

    // _handleReaderLoaded(e) {
    //     let imageSrc = e.target.result;
    //     console.log(imageSrc);
    // }

    removeFile(id) {
        this.fileManagerControllerService.deleteFileManagerUsingPOST(id).subscribe(result => {
            if (result) {
                let index = this.uploadedFiles.findIndex(item => item.id === id);
                this.uploadedFiles.splice(index, 1);
            }
        });
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.documentName && this.itemDetail.documentType && this.itemDetail.copyrightWarning) {

            if (!this.editPage) {
                this.itemDetail.userCreated = this.userLogin.lecturerCode;
                this.itemDetail.departmentId = this.userLogin.departmentId;
                this.itemDetail.topicType = 2;
                this.itemDetail.status = 2;
                this.itemDetail.dateCreated = new Date();

                console.log(this.itemDetail);

                this.documentControllerService.createDocumentUsingPOST(this.itemDetail).subscribe(resut => {
                    if (resut) {
                        this.itemDetail.id = resut.id;
                        this.addFile();
                        this.notificationFunction.sendNotification('/de-tai-ttcn-kltn', 'admin', 'Có đề tài cần duyệt', 4);
                        this.closePopupMethod(resut);
                    }
                });
            } else {
                this.itemDetail.userupdated = this.userLogin.lecturerCode;
                this.itemDetail.departmentId = this.userLogin.departmentId;
                this.itemDetail.dateUpdated = new Date();

                console.log(this.itemDetail);

                this.documentControllerService.updateDocumentUsingPUT(this.itemDetail).subscribe(resut => {
                    if (resut) {
                        this.addFile();
                        this.closePopupMethod(resut);
                    }
                });
            }
        }
    }

    addFile() {
        if (this.itemDetail.files) {
            this.uploadService.uploads(this.itemDetail.files, this.itemDetail.id, this.itemDetail.lecturerCode)
                .subscribe(result => {
                    console.log("AA: ", result);
                });
        }
    }

    onDelete(id) {
        if (id) {
            this.documentControllerService.deleteDocumentUsingPOST([id]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
