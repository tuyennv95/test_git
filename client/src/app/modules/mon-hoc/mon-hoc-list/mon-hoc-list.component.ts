import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {
    DepartmentControllerService,
    LecturerSubjectControllerService,
    RangeControllerService,
    SubjectControllerService
} from "../../../swagger";
import {UpdateMonHocComponent} from "../update-mon-hoc/update-mon-hoc.component";
import {Globals} from "../../../base/globals";


@Component({
    selector: 'mon-hoc-list-selector',
    templateUrl: './mon-hoc-list.component.html'
})

export class MonHocListComponent extends SecondPageIndexBase implements OnInit {
    department_options: any[];
    range_options: any[];
    type_options: any[];

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild(UpdateMonHocComponent)
    modal_update_mon_hoc: UpdateMonHocComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private subjectControllerService: SubjectControllerService,
        private rangeControllerService: RangeControllerService,
        private departmentControllerService: DepartmentControllerService,
        private lecturerSubjectControllerService: LecturerSubjectControllerService,
        public globals: Globals
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
                field: 'subjectCode',
                header: 'Mã Môn học',
                visible: true,
                width: '130px',
                sort: true
            },
            {
                field: 'subjectName',
                header: 'Tên Môn học',
                visible: true,
                width: '230px',
                sort: true
            },
            {
                field: 'rangeIds',
                header: 'Chuyên ngành',
                visible: true,
                width: '200px',
                sort: true
            },
            {
                field: 'departmentName',
                header: 'Bộ môn',
                visible: true,
                width: '170px',
                sort: true
            },
            {
                field: 'type',
                header: 'Loại',
                visible: true,
                width: '120px',
                sort: true
            },
            {
                field: 'lecturerList',
                header: 'DS giảng viên dạy',
                visible: true,
                width: '170px',
            },
            {
                field: 'description',
                header: 'Mô tả',
                visible: true,
                width: '200px',
                sort: true
            }
        ];
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];

        this.range_options = [
            {label: '--- Chọn Chuyên ngành ---', value: null}
        ];

        this.type_options = [
            {label: '--- Chọn Loại ---', value: null}
        ];
    }

    initDefaultOption() {
        this.searchModel.searchText = '';
        this.searchModel.departmentId = null;
        this.searchModel.rangeId = null;
        this.searchModel.type = null;
    }

    loadDynamicOptionsAndGetData() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
        });

        this.rangeControllerService.getRangesListUsingPOST()
            .subscribe(result => {
                this.range_options = this.range_options
                    .concat(this.convertDataToOptions(result.items, 'rangeName'));
            });

        for (const property in this.globals.LOAI_MON_HOC) {
            this.type_options.push({label: this.globals.LOAI_MON_HOC[property], value: property});
        }

        this.getData();
    }

    getData(page = this.page, limit = this.limit, orderCol?, isAsc?, searchText?, departmentId?, rangeId?, type?) {
        this.dataSource = [];

        this.subjectControllerService.getSubjectsListUsingPOST({
            'page': page,
            'limit': limit,
            'orderCol': orderCol,
            'isAsc': isAsc,
            'searchText': searchText,
            'departmentId': departmentId,
            'rangeId': rangeId,
            'type': type,
        }).subscribe(result => {
            if (result) {
                console.log(result);

                this.dataSource = result.items;

                this.dataSource.forEach(item => {
                    this.lecturerSubjectControllerService.getLecturerSubjectsListUsingPOST(
                        {
                            "subjectId": item.id
                        }
                    ).subscribe(lecturerList => {
                        item.lecturerList = lecturerList;
                    });
                });

                this.total = result.totalRecord;
                this.maxPage = Math.ceil(this.total / this.limit);
            }
        });

        this.resetBulkSelect();
    }

    onSearchText() {
        this.page = 1;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.rangeId, this.searchModel.type);
    }

    onSearch() {
        this.page = 1;

        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.rangeId, this.searchModel.type);
    }

    onSort(event: any) {
        this.page = 1;

        this.orderCol = event.field;
        this.isAsc = event.order === 1 ? true : false;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.rangeId, this.searchModel.type);
    }

    onNext() {
        this.page++;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.rangeId, this.searchModel.type);
    }

    onPrevious() {
        this.page--;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.rangeId, this.searchModel.type);
    }

    showEdit() {
        this.modal_update_mon_hoc.showPopup(this.selectedItems[0]);
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
        this.subjectControllerService.deleteSubjectUsingPOST(this.getListIdCheck()).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }

    getRanges(ids) {
        if (!ids) {
            return '';
        }

        let ranges = '';

        let array = ids.split(",").map(Number);
        let a = this.range_options.find(tg => tg.value === array[0]);
        if (a) {
            ranges = a.label;
        }

        for (let i = 1; i < array.length; i++) {
            let a = this.range_options.find(tg => tg.value === array[i]);
            if (a) {
                ranges += ', ' + a.label;
            }
        }

        return ranges;
    }
}
