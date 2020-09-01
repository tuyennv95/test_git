import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {DepartmentControllerService, LecturerControllerService} from "../../../swagger";

@Component({
    selector: 'modal-update-giang-vien',
    templateUrl: './update-giang-vien.component.html',
    styleUrls: ['/update-giang-vien.component.scss']
})

export class UpdateGiangVienComponent extends SecondPageEditBase implements OnInit {
    title;
    department_options: any[];
    gender_options: any[];
    editPage;

    constructor(
        protected _injector: Injector,
        private lecturerControllerService: LecturerControllerService,
        private departmentControllerService: DepartmentControllerService
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        console.log(data);

        this.onReset();

        if (data.lecturerCode) {
            let fullNamne = data.firstName + data.lastName;
            this.title = "Cập nhật Giảng viên: " + fullNamne + " [" + data.lecturerCode + "]";
            this.editPage = true;
        } else {
            this.title = "Thêm mới Giảng viên";
            this.editPage = false;
        }

        this.loadStaticOptions();
        this.loadDynamicOptions();
        this.onBeforeShowPopUp(data);
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];

        this.gender_options = [
            {label: '--- Chọn Giới tính ---', value: null},
            {label: 'Nam', value: 1},
            {label: 'Nữ', value: 2},
            {label: 'Khác', value: 3},
        ];
    }

    loadDynamicOptions() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
        });
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.lecturerCode && this.itemDetail.firstName && this.itemDetail.lastName
            && this.itemDetail.departmentId && this.itemDetail.title && this.itemDetail.position
            && this.itemDetail.password && this.itemDetail.gender && this.itemDetail.email) {
            if (!this.editPage) {
                this.lecturerControllerService.createLecturerUsingPOST(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            } else {
                this.lecturerControllerService.updateLecturerUsingPUT(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            }
        }
    }

    onDelete(code) {
        if (code) {
            this.lecturerControllerService.deleteLecturerUsingPOST([code]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
