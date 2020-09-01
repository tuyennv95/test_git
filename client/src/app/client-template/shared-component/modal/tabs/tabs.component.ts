import {Component, EventEmitter, Inject, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {SecondPageIndexBase} from "../../../../base/second-page-index-base";

@Component({
    selector: 'modal-tabs',
    templateUrl: './tabs.component.html'
})

export class Modal_tabsComponent extends SecondPageIndexBase implements OnInit {
    isShow: boolean = false;

    @ViewChild('dialog') dialog: Dialog;

    @Output() closePopup = new EventEmitter<any>();

    @Output() listenClickAdd = new EventEmitter<boolean>();

    constructor(
        protected _injector: Injector
    ) {
        super(_injector);
    }

    ngOnInit(): void {
        this.loadTableColumnConfig();

        this.resetBulkSelect();
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'maNhapHoc',
                header: 'Mã nhập học',
                visible: true,
                // width: '120px',
                sort: true
            },
            {
                field: 'hinhThucTuyenSinh',
                header: 'Hình thức tuyển sinh',
                visible: true,
                // width: '120px',
                sort: true
            },
            {
                field: 'dtDaoTao',
                header: 'ĐT Đào tạo',
                visible: true,
                // width: '120px'
            },
            {
                field: 'hoVaTen',
                header: 'Họ và tên',
                visible: true,
                // width: '120px',
                sort: true
            },
            {
                field: 'ngaySinh',
                header: 'Ngày sinh',
                visible: true,
                // width: '120px',
                sort: true
            },
            {
                field: 'chungMinhNhanDan',
                header: 'CMND',
                visible: true,
                // width: '120px'
            }
        ];
    }

    getData() {
        this.dataSource = [];

        for (let i = 1; i < 11; i++) {
            this.dataSource.push(
                {
                    id: i,
                    maNhapHoc: '1810251',
                    hinhThucTuyenSinh: 'Thi tuyển',
                    dtDaoTao: 'Nhu cầu xã hội',
                    hoVaTen: 'Lê Thị Hải Yến',
                    ngaySinh: '02/11/2000',
                    chungMinhNhanDan: 187762773,
                    status: this.getRandomItemFromList([1, 2, 3, null])
                }
            );
        }

        this.total = this.dataSource.length;

        this.clearSelectedCheckboxItems();
    }

    resetBulkSelect() {
        this.ids = [];
        this.selectedItems = [];
        this.isCheckAll = null;
    }

    onAdd() {
        this.listenClickAdd.emit(true);
    }

    // table row selection
    //------------------------

    checkSelectionState() {
        this.isCheckAll = this.selectedItems.length === 0 ? null :
            (this.selectedItems.length > 0 && this.selectedItems.length === this.dataSource.length);

        this.isMultiEdit = this.selectedItems.length > 1;
    }

    onChangeBulkSelection() {
        if (this.isCheckAll === null || this.isCheckAll) {
            this.resetBulkSelect();
            this.dataSource.forEach(item => this.selectedItems.push(item));
        } else {
            this.resetBulkSelect();
        }

        this.checkSelectionState();
    }

    //------------------------------------------

    clearSelectedCheckboxItems() {
        this.selectedItems = [];
    }

    // modal
    //------------------------
    onReset() {
        this.selectedItems = [];
    }

    closePopupMethod(data: any) {
        this.isShow = false;
        this.closePopup.next(data);
    }

    getMaxDialogHeight() {
        return (window.innerHeight - 200).toString() + 'px';
    }

    onBeforeShowPopUp() {
        this.getData();
    }

    cancel() {
        this.closePopupMethod(null);
    }

    async showPopup(data: any = {}) {
        this.isShow = true;
        await this.onShowPopup(data);

        setTimeout(() => {
            if (this.dialog) {
                this.dialog.center();
            }
        }, 500);
    }

    onShowPopup(data: any) {
        this.onReset();
        this.onBeforeShowPopUp();
    }

    doSelectData() {
        this.closePopupMethod(this.selectedItems);
    }

    resetDialogPosition() {
        window.setTimeout(() => {
            this.dialog.center();
        });
    }

    handleTabChange(event) {
        this.resetDialogPosition();
    }

    // helper
    //------------------------
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomItemFromList(listItem) {
        let index = Math.floor(Math.random() * listItem.length);

        return listItem[index];
    }
}
