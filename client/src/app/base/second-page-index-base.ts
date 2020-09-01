import {OnInit, Injector, ViewChild, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

export abstract class SecondPageIndexBase implements OnInit {
    searchModel: any = {};
    orderCol = '';

    isLoading = false;
    openSearchAdv = false;
    isCheckAll = false;
    isMultiEdit = false;
    openSelectCheck = false;
    isAsc = false;
    openColumnList = false;
    preventTableFilterClosing: boolean;
    tableFilterDelayClosingTimer;

    ids = [];
    cols = [];
    dataSource = [];
    selectedItems = [];

    total = 0;
    page = 1;
    maxPage = 1;
    limit = 10;
    limitAll = 10000;

    @ViewChild('columnListContainer')
    columnListContainerElement: ElementRef;

    @ViewChild('bulkSelectContainer')
    bulkSelectContainerElement: ElementRef;

    protected _activatedRoute: ActivatedRoute;
    protected _router: Router;

    constructor(
        protected _injector: Injector
    ) {
        this._router = this._injector.get(Router);
        this._activatedRoute = this._injector.get(ActivatedRoute);
    }


    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, targetElement: HTMLElement) {
        if (this.columnListContainerElement) {
            if (!this.columnListContainerElement.nativeElement.contains(targetElement)) {
                this.openColumnList = false;
            }
        }

        if (this.bulkSelectContainerElement) {
            if (!this.bulkSelectContainerElement.nativeElement.contains(targetElement)) {
                this.openSelectCheck = false;
            }
        }
    }

    ngOnInit(): void {
    }


    getData(page = this.page, limit = this.limit, orderCol?, isAsc?) {

    }

    onSearch(): void {
        this.page = 1;
        this.getData();
        // this.openSearchAdv = false;
    }

    onSort(event: any) {

    }

    onChangePagination() {
        this.page = 1;
        this.getData(this.page, this.limit);
    }

    onPage(event: any): void {
        this.page = (event.first / event.rows) + 1;
        this.limit = event.rows;
        this.getData();
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
    resetBulkSelect() {
        this.ids = [];
        this.selectedItems = [];
        this.isCheckAll = null;
    }

    getListIdCheck(field = 'id') {
        let ids = [];

        this.selectedItems.forEach(item => {
            ids.push(item[field]);
        });

        return ids;
    }

    convertDataToOptions(data: any[], fieldName: string, fieldId?) {
        let options = [];

        if (data.length > 0) {
            if (fieldId) {
                data.map(item =>
                    options.push({label: item[fieldName], value: item[fieldId]})
                );
            } else {
                data.map(item =>
                    options.push({label: item[fieldName], value: item.id})
                );
            }
        }

        return options;
    }

    getFieldByIdToOptions(data: any[], id: number) {
        let tg = data.find(item => item.value === id);

        if (tg) {
            return tg.label;
        } else {
            return "Chưa chọn khoa";
        }
    }
}
