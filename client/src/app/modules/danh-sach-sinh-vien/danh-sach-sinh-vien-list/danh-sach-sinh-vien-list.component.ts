import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {UpdateDanhSachSinhVienComponent} from "../update-danh-sach-sinh-vien/update-danh-sach-sinh-vien.component";
import {StudentControllerService} from "../../../swagger";

@Component({
    selector: 'ds-sinh-vien-list-selector',
    templateUrl: './danh-sach-sinh-vien-list.component.html',
    styleUrls: ['danh-sach-sinh-vien-list.component.scss']
})

export class DanhSachSinhVienListComponent extends SecondPageIndexBase implements OnInit {
    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild(UpdateDanhSachSinhVienComponent)
    modal_update_ds_sinh_vien: UpdateDanhSachSinhVienComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private studentControllerService: StudentControllerService
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.loadTableColumnConfig();
        this.getData();

        this.resetBulkSelect();
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'studentCode',
                header: 'Mã sinh viên',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'classCode',
                header: 'Mã lớp',
                visible: true,
                width: '300px',
                sort: true
            },
            {
                field: 'firstName',
                header: 'Họ đệm',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'lastName',
                header: 'Tên',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'gender',
                header: 'Giới tính',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'address',
                header: 'Địa chỉ',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'email',
                header: 'Email',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'phoneNumber',
                header: 'Số ĐT',
                visible: true,
                width: '150px',
                sort: true
            },
        ];
    }

    getData(page = this.page, limit = this.limit, orderCol?, isAsc?, searchText?) {
        this.dataSource = [];

        this.studentControllerService.getStudentResultListUsingPOST({
            'page': page,
            'limit': limit,
            'orderCol': orderCol,
            'isAsc': isAsc,
            'searchText': searchText,
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
            this.searchModel.searchText);
    }

    onSearch() {
        this.page = 1;

        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText);
    }

    onSort(event: any) {
        this.page = 1;

        this.orderCol = event.field;
        this.isAsc = event.order === 1 ? true : false;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText);
    }

    onNext() {
        this.page++;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText);
    }

    onPrevious() {
        this.page--;
        this.getData(this.page, this.limit, this.orderCol, this.isAsc,
            this.searchModel.searchText);
    }

    showEdit() {
        this.modal_update_ds_sinh_vien.showPopup(this.selectedItems[0]);
    }

    closePopup(data) {
        console.log(data);
        this.getData();
        this.app.showSuccess();
    }

    deleteItem() {
        this.studentControllerService.deleteStudentUsingPOST(this.getListIdCheck('studentCode')).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }

    getGender(gender) {
        if (+gender === 1) {
            return "Nam"
        } else {
            return "Nữ"
        }
    }
}
