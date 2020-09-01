import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {StudentControllerService} from "../../../swagger";
import {UploadService} from "../../../services/upload.service";

@Component({
    selector: 'modal-update-ds-sinh-vien',
    templateUrl: './update-danh-sach-sinh-vien.component.html',
    styleUrls: ['/update-danh-sach-sinh-vien.component.scss']
})

export class UpdateDanhSachSinhVienComponent extends SecondPageEditBase implements OnInit {
    title;
    department_options: any[];
    gender_options: any[];
    editPage;

    file;

    @ViewChild('fileUpload') fileUpload;

    constructor(
        protected _injector: Injector,
        private studentControllerService: StudentControllerService,
        private uploadService: UploadService
    ) {
        super(_injector);
    }

    onShowPopup(data: any) {
        console.log(data);

        this.fileUpload.files = [];
        this.onReset();

        if (data.studentCode) {
            let fullNamne = data.firstName + data.lastName;
            this.title = "Cập nhật Sinh viên: " + fullNamne + " [" + data.studentCode + "]";
            this.editPage = true;
        } else {
            this.title = "Thêm mới Sinh viên";
            this.editPage = false;
        }

        this.loadStaticOptions();
        this.onBeforeShowPopUp(data);
    }

    loadStaticOptions() {
        this.gender_options = [
            {label: '--- Chọn Giới tính ---', value: null},
            {label: 'Nam', value: 1},
            {label: 'Nữ', value: 2},
            {label: 'Khác', value: 3},
        ];
    }

    onUpload(e) {
        console.log(e);

        this.file = e.files[0];
    }

    onSave() {
        if (this.thispage === 0) {
            this.checkSave = true;

            if (this.itemDetail.studentCode && this.itemDetail.firstName && this.itemDetail.lastName
                && this.itemDetail.classCode && this.itemDetail.password && this.itemDetail.gender &&
                this.itemDetail.email) {
                if (!this.editPage) {
                    this.studentControllerService.createStudentUsingPOST(this.itemDetail).subscribe(resut => {
                        this.closePopupMethod(resut);
                    });
                } else {
                    this.studentControllerService.updateStudentUsingPUT(this.itemDetail).subscribe(result => {
                        this.closePopupMethod(result);
                    });
                }
            }
        } else {
            this.uploadService.uploadStudent(this.file).subscribe(result => {
                if (result) {
                    this.closePopupMethod(result);
                }
            })
        }
    }

    onDelete(id) {
        if (id) {
            this.studentControllerService.deleteStudentUsingPOST([id]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
