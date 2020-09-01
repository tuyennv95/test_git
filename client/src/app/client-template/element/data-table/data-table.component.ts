import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {SecondPageIndexBase} from "../../../base/second-page-index-base";
import {Modal_formComponent} from "../../shared-component/modal/form/form.component";
import {Modal_tabsComponent} from "../../shared-component/modal/tabs/tabs.component";

@Component({
    selector: 'app-client-template-dataTable',
    templateUrl: 'data-table.component.html'
})
export class DataTableComponent extends SecondPageIndexBase implements OnInit {
    searchModel: any = {};

    namHoc_options: any[];
    khoa_options: any[];
    nganhHoc_options: any[];

    preventTableFilterClosing: boolean;
    tableFilterDelayClosingTimer;

    breadcrumbItems: any[];

    // Left action block
    leftTableActionsWidth;
    leftTableActionsElements: any[];

    @ViewChild(Modal_formComponent)
    modal_form: Modal_formComponent;

    @ViewChild(Modal_tabsComponent)
    modal_tabs: Modal_tabsComponent;

    constructor(
        public app: AppComponent,
        protected _injector: Injector
    ) {
        super(_injector);
    }

    ngOnInit() {
        this.loadTableColumnConfig();
        this.loadBreadcrumbItems();
        this.loadStaticOptions();
        this.initDefaultOption();
        this.loadDynamicOptionsAndGetData();

        setTimeout(() => {
            this.onInitLeftTableActionsWidth();
        }, 100);

        this.resetBulkSelect();
    }

    loadTableColumnConfig() {
        this.cols = [
            {
                field: 'maNhapHoc',
                header: 'Mã nhập học',
                visible: true,
                sort: true
            },
            {
                field: 'hinhThucTuyenSinh',
                header: 'Hình thức tuyển sinh',
                visible: true,
                sort: true
            },
            {
                field: 'dtDaoTao',
                header: 'ĐT Đào tạo',
                visible: true,
            },
            {
                field: 'hoVaTen',
                header: 'Họ và tên',
                visible: true,
                sort: true
            },
            {
                field: 'ngaySinh',
                header: 'Ngày sinh',
                visible: true,
                sort: true
            },
            {
                field: 'chungMinhNhanDan',
                header: 'CMND',
                visible: true,
            }
        ];
    }

    loadBreadcrumbItems() {
        this.breadcrumbItems = Array(10)
            .fill(0)
            .map((x, i) => ({
                label: ' Breadcrumb ' + (i + 1),
                href: 'javascript:void(0)'
            }));
    }

    loadStaticOptions() {
        this.namHoc_options = [
            {label: 'Năm học', value: 0}
        ];

        this.khoa_options = [
            {label: 'Khoa', value: 0}
        ];

        this.nganhHoc_options = [
            {label: 'Ngành học', value: 0}
        ];
    }

    initDefaultOption() {
        this.searchModel.namHoc = 0;
        this.searchModel.khoa = 0;
        this.searchModel.nganhHoc = 0;
    }

    loadDynamicOptionsAndGetData() {
        for (let i = 1; i <= 4; i++) {
            this.namHoc_options.push({
                label: 2020 - i + '',
                value: i
            });

            this.khoa_options.push({
                label: 'Khoa ' + i,
                value: i
            });

            this.nganhHoc_options.push({
                label: 'Ngành ' + i,
                value: i
            });
        }

        this.getData();
    }

    getData() {
        this.dataSource = [];

        for (let i = 1; i <= 30; i++) {
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

        this.resetBulkSelect();
    }

    resetBulkSelect() {
        this.ids = [];
        this.selectedItems = [];
        this.isCheckAll = null;
    }

    listenModalClickAdd(event) {
        if (event) {
            this.modal_form.showPopup();
        }
    }

    // left action block
    //------------------------

    onInitLeftTableActionsWidth() {
        let target = document.getElementById('left-table-actions');
        this.leftTableActionsWidth = target.clientWidth;
        this.leftTableActionsElements = [];

        target.childNodes.forEach(item => {
            if (item.nodeName === 'BUTTON') {
                this.leftTableActionsElements.push({
                    element: item,
                    text: item['innerText'],
                    width: item['offsetWidth'] + 16, // 16: "safe" spacing
                    visible: false
                });
            }
        });

        this.determineLeftTableActionsItemsVisibility();
    }

    onLeftTableActionsWidthChange() {
        let target = document.getElementById('left-table-actions');
        this.leftTableActionsWidth = target.clientWidth;

        this.determineLeftTableActionsItemsVisibility();
    }

    private determineLeftTableActionsItemsVisibility() {
        let widthScore = 0;
        let totalItems = this.leftTableActionsElements.length;
        let lastItemIndex = totalItems - 1;
        let widthThreshold = this.leftTableActionsWidth - this.leftTableActionsElements[lastItemIndex].width;

        for (let i = 0; i < totalItems; i++) {
            this.leftTableActionsElements[i].element.classList.add('hidden');
            this.leftTableActionsElements[i].visible = false;
        }

        for (let i = 0; i < lastItemIndex; i++) {
            if (this.leftTableActionsElements[i].width + widthScore < widthThreshold) {
                widthScore += this.leftTableActionsElements[i].width;
                this.leftTableActionsElements[i].element.classList.remove('hidden');
                this.leftTableActionsElements[i].visible = true;
            } else {
                this.leftTableActionsElements[lastItemIndex].element.classList.remove('hidden');
                this.leftTableActionsElements[lastItemIndex].visible = true;
                break;
            }
        }
    }


    // table filter
    //------------------------

    closeTableFilter() {
        this.openSearchAdv = !!this.preventTableFilterClosing;
    }

    delayTableFilterClosing(delayTime: number = 100) {
        clearTimeout(this.tableFilterDelayClosingTimer);

        this.preventTableFilterClosing = true;

        this.tableFilterDelayClosingTimer = setTimeout(() => {
            this.preventTableFilterClosing = false;
        }, delayTime);
    }

    // table cols visibility
    //------------------------

    getVisibleColsNumber() {
        let items = this.cols.filter(item => item.visible);

        return items.length;
    }

    resetColsVisibility() {
        this.cols.forEach(item => item.visible = false);
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

    // helper
    //------------------------
    consoleLog(event) {
        console.log(event);
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomItemFromList(listItem) {
        let index = Math.floor(Math.random() * listItem.length);

        return listItem[index];
    }
}
