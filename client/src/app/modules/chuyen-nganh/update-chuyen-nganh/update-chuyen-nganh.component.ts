import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {DepartmentControllerService, RangeControllerService} from '../../../swagger';

@Component({
    selector: 'modal-update-chuyen-nganh',
    templateUrl: './update-chuyen-nganh.component.html',
    styleUrls: ['/update-chuyen-nganh.component.scss']
})

export class UpdateChuyenNganhComponent extends SecondPageEditBase implements OnInit {
    title;
    department_options: any[];

    constructor(
        protected _injector: Injector,
        private rangeControllerService: RangeControllerService,
        private departmentControllerService: DepartmentControllerService
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        this.onReset();

        if (data.id) {
            this.title = "Cập nhật Chuyên ngành: " + data.rangeName;
        } else {
            this.title = "Thêm mới Chuyên ngành";
        }

        this.loadStaticOptions();
        this.loadDynamicOptions();
        this.onBeforeShowPopUp(data);
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];
    }

    loadDynamicOptions() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
        });
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.rangeName && this.itemDetail.departmentId) {
            if (this.itemDetail.id) {
                this.rangeControllerService.updateRangeUsingPUT(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            } else {
                this.rangeControllerService.createRangeUsingPOST(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            }


        }
    }

    onDelete(id) {
        if (id) {
            this.rangeControllerService.deleteRangeUsingPOST([id]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
