import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {DepartmentControllerService} from '../../../swagger';

@Component({
    selector: 'modal-update-bo-mon',
    templateUrl: './update-bo-mon.component.html',
    styleUrls: ['/update-bo-mon.component.scss']
})

export class UpdateBoMonComponent extends SecondPageEditBase implements OnInit {
    title;

    constructor(
        protected _injector: Injector,
        private departmentControllerService: DepartmentControllerService
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        this.onReset();

        if (data.id) {
            this.title = "Cập nhật Bộ môn: " + data.departmentName + " [" + data.departmentCode + "]";
        } else {
            this.title = "Thêm mới Bộ môn";
        }

        this.onBeforeShowPopUp(data);
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.departmentCode && this.itemDetail.departmentName) {
            if (this.itemDetail.id) {
                this.departmentControllerService.updateDepartmentUsingPUT(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            } else {
                this.departmentControllerService.createDepartmentUsingPOST(this.itemDetail).subscribe(resut => {
                    this.closePopupMethod(resut);
                });
            }


        }
    }

    onDelete(id) {
        if (id) {
            this.departmentControllerService.deleteDepartmentUsingPOST([id]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
