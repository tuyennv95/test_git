import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {UpdateGiangVienComponent} from '../update-giang-vien/update-giang-vien.component';
import {
    DepartmentControllerService,
    LecturerControllerService,
    LecturerSubjectControllerService
} from "../../../swagger";

@Component({
    selector: 'giang-vien-list-selector',
    templateUrl: './giang-vien-list.component.html',
    styleUrls: ['giang-vien-list.component.scss']
})

export class GiangVienListComponent extends SecondPageIndexBase implements OnInit {
    department_options: any[];

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild(UpdateGiangVienComponent)
    modal_update_giang_vien: UpdateGiangVienComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private lecturerControllerService: LecturerControllerService,
        private departmentControllerService: DepartmentControllerService,
        private lecturerSubjectControllerService: LecturerSubjectControllerService,
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
                field: 'lecturerCode',
                header: 'Mã giảng viên',
                visible: true,
                width: '130px',
                sort: true
            },
            {
                field: 'lastName',
                header: 'Tên giảng viên',
                visible: true,
                width: '200px',
                sort: true
            },
            {
                field: 'position',
                header: 'Chức vụ',
                visible: true,
                width: '170px',
                sort: true
            },
            {
                field: 'departmentId',
                header: 'Bộ môn',
                visible: true,
                width: '170px',
                sort: true
            },
            {
                field: 'email',
                header: 'email',
                visible: true,
                width: '180px',
                sort: true
            },
            {
                field: 'subjectList',
                header: 'Các môn giảng dạy',
                visible: true,
                width: '200px',
            },
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

        this.lecturerControllerService.getLecturerResultListUsingPOST({
            'page': page,
            'limit': limit,
            'orderCol': orderCol,
            'isAsc': isAsc,
            'searchText': searchText,
            'departmentId': departmentId,
        }).subscribe(result => {
            if (result) {
                this.dataSource = result.items;

                this.dataSource.forEach(item => {
                    this.lecturerSubjectControllerService.getLecturerSubjectsListUsingPOST(
                        {
                            "lecturerCode": item.lecturerCode
                        }
                    ).subscribe(subjectList => {
                        item.subjectList = subjectList;
                    })
                });

                this.total = result.totalRecord;
                this.maxPage = Math.ceil(this.total / this.limit);
            }
            console.log("result: ", result);
        });

        this.resetBulkSelect();
    }

    onSearchText() {
        this.page = 1;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId);
    }

    onSearch() {
        this.page = 1;

        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId);
    }

    onSort(event: any) {
        this.page = 1;

        this.orderCol = event.field;
        this.isAsc = event.order === 1 ? true : false;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId);
    }

    onNext() {
        this.page++;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId);
    }

    onPrevious() {
        this.page--;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId);
    }

    showEdit() {
        this.modal_update_giang_vien.showPopup(this.selectedItems[0]);
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
        this.lecturerControllerService.deleteLecturerUsingPOST(this.getListIdCheck('lecturerCode')).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }
}
