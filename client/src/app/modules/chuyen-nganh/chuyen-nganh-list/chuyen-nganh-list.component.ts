import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {DepartmentControllerService, RangeControllerService} from '../../../swagger';
import {UpdateChuyenNganhComponent} from "../update-chuyen-nganh/update-chuyen-nganh.component";

@Component({
    selector: 'chuyen-nganh-list-selector',
    templateUrl: './chuyen-nganh-list.component.html',
    styleUrls: ['chuyen-nganh-list.component.scss']
})

export class ChuyenNganhListComponent extends SecondPageIndexBase implements OnInit {
    department_options;

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild(UpdateChuyenNganhComponent)
    modal_update_chuyen_nganh: UpdateChuyenNganhComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private rangeControllerService: RangeControllerService,
        private departmentControllerService: DepartmentControllerService
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.loadTableColumnConfig();
        this.loadStaticOptions();
        this.initDefaultOption();
        this.loadDynamicOptionsAndGetData();

        this.resetBulkSelect();
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'rangeName',
                header: 'Tên Chuyên ngành',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'departmentId',
                header: 'Bộ môn',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'description',
                header: 'Mô tả',
                visible: true,
                width: '250px',
                sort: true
            }
        ];
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];
    }

    initDefaultOption() {
        this.searchModel.searchText = '';
        this.searchModel.departmentId = null;
    }

    loadDynamicOptionsAndGetData() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
        });

        this.getData();
    }

    getData(page = this.page, limit = this.limit, orderCol?, isAsc?, searchText?, departmentId?) {
        this.dataSource = [];

        this.rangeControllerService.getRangesListUsingPOST({
            'page': page,
            'limit': limit,
            'orderCol': orderCol,
            'isAsc': isAsc,
            'searchText': searchText,
            'departmentId': departmentId,
        }).subscribe(result => {
            console.log("AA result: ", result);
            this.dataSource = result.items;
            this.total = result.totalRecord;
            this.maxPage = Math.ceil(this.total / this.limit);
        });

        this.resetBulkSelect();
    }

    onSearchText() {
        this.page = 1;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText, this.searchModel.departmentId);
    }

    onSearch() {
        this.page = 1;

        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText, this.searchModel.departmentId);
    }

    onSort(event: any) {
        this.page = 1;

        this.orderCol = event.field;
        this.isAsc = event.order === 1 ? true : false;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText, this.searchModel.departmentId);
    }

    onNext() {
        this.page++;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText, this.searchModel.departmentId);
    }

    onPrevious() {
        this.page--;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText, this.searchModel.departmentId);
    }

    showEdit() {
        this.modal_update_chuyen_nganh.showPopup(this.selectedItems[0]);
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
        this.rangeControllerService.deleteRangeUsingPOST(this.getListIdCheck()).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }
}
