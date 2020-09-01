import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {DepartmentControllerService} from '../../../swagger';
import {UpdateBoMonComponent} from '../update-bo-mon/update-bo-mon.component';
import {NotificationComponent} from "../../../client-template/element/notification/notification.component";

@Component({
    selector: 'bo-mon-list-selector',
    templateUrl: './bo-mon-list.component.html',
    styleUrls: ['bo-mon-list.component.scss']
})

export class BoMonListComponent extends SecondPageIndexBase implements OnInit {
    @ViewChild(UpdateBoMonComponent)
    modal_update_bo_mon: UpdateBoMonComponent;

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private departmentControllerService: DepartmentControllerService
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.loadTableColumnConfig();
        this.initDefaultOption();
        this.getData();

        this.resetBulkSelect();
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'departmentCode',
                header: 'Mã Bộ môn',
                visible: true,
                width: '120px',
                sort: true
            },
            {
                field: 'departmentName',
                header: 'Tên Bộ môn',
                visible: true,
                width: '200px',
                sort: true
            },
            {
                field: 'description',
                header: 'Mô tả',
                visible: true,
                width: '250px',
                sort: true
            },
        ];
    }

    initDefaultOption() {
        this.searchModel.searchText = '';
    }

    getData() {
        this.dataSource = [];

        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            console.log("result: ", result);
            this.dataSource = result;
        });

        this.total = this.dataSource.length;

        this.resetBulkSelect();
    }

    showEdit() {
        this.modal_update_bo_mon.showPopup(this.selectedItems[0]);
    }

    closePopup(data) {
        if (data) {
            this.getData();
            this.app.showSuccess();
        } else {
            this.app.showError();
        }
    }

    deleteItem() {
        this.departmentControllerService.deleteDepartmentUsingPOST(this.getListIdCheck()).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }
}
