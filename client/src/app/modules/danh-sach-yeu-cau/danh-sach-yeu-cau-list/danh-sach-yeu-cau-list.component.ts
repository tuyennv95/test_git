import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SecondPageIndexBase} from '../../../base/second-page-index-base';
import {AppComponent} from '../../../app.component';
import {UpdateDanhSachYeuCauComponent} from "../update-danh-sach-yeu-cau/update-danh-sach-yeu-cau.component";
import {DocumentRequestControllerService} from "../../../swagger/api/documentRequestController.service";
import {DuyetYeuCauComponent} from "../duyet-yeu-cau/duyet-yeu-cau.component";

@Component({
    selector: 'ds-yeu-cau-list-selector',
    templateUrl: './danh-sach-yeu-cau-list.component.html',
    styleUrls: ['danh-sach-yeu-cau-list.component.scss']
})

export class DanhSachYeuCauListComponent extends SecondPageIndexBase implements OnInit {
    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    @ViewChild(UpdateDanhSachYeuCauComponent)
    modal_update_ds_yeu_cau: UpdateDanhSachYeuCauComponent;

    @ViewChild(DuyetYeuCauComponent)
    modal_duyet_yeu_cau: DuyetYeuCauComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector,
        private documentRequestControllerService: DocumentRequestControllerService
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
                field: 'title',
                header: 'Tiêu đề',
                visible: true,
                width: '150px',
                sort: true
            },
            {
                field: 'request',
                header: 'Yêu cầu',
                visible: true,
                width: '300px',
                sort: true
            },
            {
                field: 'status',
                header: 'Trạng thái',
                visible: true,
                width: '150px',
                sort: true
            }
        ];
    }

    getData(page = this.page, limit = this.limit, orderCol?, isAsc?, searchText?) {
        this.dataSource = [];

        let property = {};

        if (+this.userLogin.role === 3) {
            property = {
                'page': page,
                'limit': limit,
                'orderCol': orderCol,
                'isAsc': isAsc,
                'searchText': searchText,
                'studentCode': this.userLogin.studentCode
            }
        } else {
            property = {
                'page': page,
                'limit': limit,
                'orderCol': orderCol,
                'isAsc': isAsc,
                'searchText': searchText,
            }
        }

        this.documentRequestControllerService.getDocumentRequestsListUsingPOST(property).subscribe(result => {
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
        this.modal_update_ds_yeu_cau.showPopup(this.selectedItems[0]);
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
        this.documentRequestControllerService.deleteDocumentRequestUsingPOST(this.getListIdCheck()).subscribe(resut => {
            if (resut) {
                this.getData();
                this.app.showSuccess();
            } else {
                this.app.showError();
            }
        });
    }

    getStatus(stauts) {
        if (+stauts === 1) {
            return "Đã hủy";
        } else if (+stauts === 2) {
            return "Chờ duyệt";
        } else {
            return "Đã được duyệt";
        }
    }
}
