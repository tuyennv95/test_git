import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {
    DepartmentControllerService,
    LecturerControllerService
} from "../../../swagger";
import {DocumentControllerService} from "../../../swagger/api/documentController.service";
import {Globals} from "../../../base/globals";
import {Router} from "@angular/router";
import {DocumentReviewControllerService} from "../../../swagger/api/documentReviewController.service";
import {UpdateTtcnKltnComponent} from "../update-ttcn-kltn/update-ttcn-kltn.component";
import {YeuCauTaiLieuComponent} from "../yeu-cau-tai-lieu/yeu-cau-tai-lieu.component";
import {DuyetTtcnKltnComponent} from "../duyet-ttcn-kltn/duyet-ttcn-kltn.component";

@Component({
    selector: 'ttcn-kltn-list-selector',
    templateUrl: './ttcn-kltn-list.component.html',
    styleUrls: ['ttcn-kltn-list.component.scss']
})

export class TtcnKltnListComponent extends SecondPageIndexBase implements OnInit {
    department_options: any[];
    lecturer_options: any[];
    type_options: any[];
    status_options: any[];
    favourite_options: any[];

    idsFavourite = [];

    @ViewChild(UpdateTtcnKltnComponent)
    modal_update_ttcn_kltn: UpdateTtcnKltnComponent;

    @ViewChild(YeuCauTaiLieuComponent)
    modal_yeu_cau_tai_lieu: YeuCauTaiLieuComponent;

    @ViewChild(DuyetTtcnKltnComponent)
    modal_duyet_ttcn_kltn: DuyetTtcnKltnComponent;

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private router: Router,
        private documentControllerService: DocumentControllerService,
        private departmentControllerService: DepartmentControllerService,
        private lecturerControllerService: LecturerControllerService,
        private documentReviewControllerService: DocumentReviewControllerService,
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

        console.log("userLogin: ", JSON.parse(localStorage.getItem('userLogin')));
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'documentName',
                header: 'Tên dề tài',
                visible: true,
                width: '250px',
                sort: true
            },
            {
                field: 'documentType',
                header: 'Loại đề tài',
                visible: true,
                width: '170px',
                sort: true
            },
            {
                field: 'lecturerCode',
                header: 'Giảng viên hướng dẫn',
                visible: true,
                width: '190px',
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
                width: '300px',
                sort: true
            },
            {
                field: 'viewsCount',
                header: 'Lượt xem',
                visible: true,
                width: '120px',
                sort: true
            },
            {
                field: 'downloadsCount',
                header: 'Lượt tải',
                visible: true,
                width: '120px',
                sort: true
            },
            {
                field: 'copyrightWarning',
                header: 'Cảnh báo bản quyền',
                visible: true,
                width: '150px',
                sort: true
            }
        ];
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];

        this.lecturer_options = [
            {label: '--- Chọn Giảng viên ---', value: null}
        ];

        this.type_options = [
            {label: '--- Chọn Loại ---', value: null}
        ];

        this.status_options = [
            {label: '--- Chọn Trạng thái ---', value: null}
        ];

        this.favourite_options = [
            {label: '--- Loại đề tài ---', value: null}
        ];
    }

    initDefaultOption() {
        this.searchModel.searchText = '';
        this.searchModel.departmentId = null;
        this.searchModel.lecturerCode = null;
        this.searchModel.type = null;
        this.searchModel.status = null;
        this.searchModel.favourite = null;
    }

    loadDynamicOptionsAndGetData() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
        });

        for (const property in this.globals.LOAI_DE_TAI) {
            this.type_options.push({label: this.globals.LOAI_DE_TAI[property], value: property});
        }

        if (+this.userLogin.role < 3) {
            for (const property in this.globals.STATUS) {
                this.status_options.push({label: this.globals.STATUS[property], value: property});
            }
        }

        if (+this.userLogin.role === 3) {
            for (const property in this.globals.FAVOURITE) {
                this.favourite_options.push({label: this.globals.FAVOURITE[property], value: property});
            }
        }

        this.getData();

        if (+this.userLogin.role === 3) {
            this.idsFavourite = [];

            this.documentReviewControllerService.getDocumentReviewsListUsingPOST({
                'studentCode': this.userLogin.studentCode
            }).subscribe(item => {
                item.forEach(tg => {
                    this.idsFavourite.push(tg.documentId);
                });
            });
        }
    }

    getData(page = this.page, limit = this.limit, orderCol?, isAsc?, searchText?, departmentId?, lecturerCode?, type?) {
        this.dataSource = [];
        let property = {};
        if (+this.userLogin.role === 3 || !this.userLogin) {
            let favourite = '';
            if (this.searchModel.favourite) {
                favourite = this.idsFavourite.toString()
            }

            property = {
                'topicTye': 2,
                'page': page,
                'limit': limit,
                'orderCol': orderCol,
                'isAsc': isAsc,
                'searchText': searchText,
                'departmentId': departmentId,
                'lecturerCode': lecturerCode,
                'type': type,
                'favourite': favourite,
                'student': this.userLogin.studentCode
            }
        } else if (+this.userLogin.role === 2) {
            property = {
                'topicTye': 2,
                'page': page,
                'limit': limit,
                'orderCol': orderCol,
                'isAsc': isAsc,
                'searchText': searchText,
                'departmentId': departmentId,
                'lecturerCode': lecturerCode,
                'type': type,
                'status': this.searchModel.status,
                'userLogin': this.userLogin.lecturerCode,
            }
        } else {
            property = {
                'topicTye': 2,
                'page': page,
                'limit': limit,
                'orderCol': orderCol,
                'isAsc': isAsc,
                'searchText': searchText,
                'departmentId': departmentId,
                'lecturerCode': lecturerCode,
                'type': type,
                'status': this.searchModel.status,
            }
        }

        this.documentControllerService.getDocumentsListUsingPOST(property).subscribe(result => {
            if (result) {
                this.dataSource = result.items;

                this.total = result.totalRecord;
                this.maxPage = Math.ceil(this.total / this.limit);
            }

            console.log("data: ", this.dataSource);
        });

        this.resetBulkSelect();
    }

    onSearchText() {
        this.page = 1;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.lecturerCode,
            this.searchModel.type);
    }

    onSearch() {
        this.page = 1;

        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.lecturerCode,
            this.searchModel.type);
    }

    onSort(event: any) {
        this.page = 1;

        this.orderCol = event.field;
        this.isAsc = event.order === 1 ? true : false;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.lecturerCode,
            this.searchModel.type);
    }

    onNext() {
        this.page++;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.lecturerCode,
            this.searchModel.type);
    }

    onPrevious() {
        this.page--;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc, this.searchModel.searchText,
            this.searchModel.departmentId, this.searchModel.lecturerCode,
            this.searchModel.type);
    }

    showEdit() {
        this.modal_update_ttcn_kltn.showPopup(this.selectedItems[0]);
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
        this.documentControllerService.deleteDocumentUsingPOST(this.getListIdCheck()).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }

    viewDeail() {
        this.router.navigate(['tai-lieu/detail/' + this.selectedItems[0].id]);
    }

    studentViewDetail(index) {
        if (+this.userLogin.role === 3 ||
            (this.userLogin.lecturerCode !== this.dataSource[index].lecturerCode && +this.userLogin.role === 2)) {
            this.router.navigate(['tai-lieu/detail/' + this.dataSource[index].id]);
        }
    }

    selectDepartment(event) {
        this.lecturer_options = [
            {label: '--- Chọn Giảng viên ---', value: null},
        ];

        if (event.value) {
            this.lecturerControllerService.getLecturerResultListUsingPOST({"departmentId": event.value})
                .subscribe(result => {
                    this.lecturer_options = this.lecturer_options
                        .concat(this.convertDataLecturerToOptions(result.items));
                });
        }
    }

    convertDataLecturerToOptions(data: any[]) {
        let options = [];

        if (data.length > 0) {
            data.map(item =>
                options.push({
                    label: item['title'] + ". " + item['firstName'] + " " + item['lastName'],
                    value: item.lecturerCode
                })
            );
        }

        return options;
    }
}

