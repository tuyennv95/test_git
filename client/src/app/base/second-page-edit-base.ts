import {Output, EventEmitter, ViewChild, Injector, ElementRef, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {FileUpload} from 'primeng/primeng';

export class SecondPageEditBase implements OnInit {

    @ViewChild('dialog') dialog: Dialog;
    @ViewChild('formElement') formElement: ElementRef;
    @ViewChild('pUpload') pUpload: FileUpload;

    isShow = false;
    submitting = false;
    openPopupDelete = false;

    checkSave = false;

    itemDetail: any = {};
    uploadedFiles: any[] = [];

    thispage;

    popupId: string;
    formGroup: FormGroup = new FormGroup({});

    @Output() closePopup = new EventEmitter<any>();

    constructor(
        protected _injector: Injector,
    ) {
        // this.popupId = this._injector.get(CommonService).guid();
    }

    ngOnInit(): void {
    }

    save() {
        this.submitting = true;

        if (this.formGroup.invalid) {
            this.showValidateMessage();
            this.submitting = false;
            this.scrollToTop();
            return;
        }

        this.onBeforeSave();

        if (this.itemDetail['id']) {
            this.onUpdate();
        } else {
            this.onInsert();
        }
    }

    showValidateMessage() {

    }

    onBeforeSave() {

    }

    onAfterSave() {

    }

    async showPopup(data: any = {}) {
        this.isShow = true;
        this.openPopupDelete = false;
        await this.onShowPopup(data);

        setTimeout(() => {
            const viewRef = document.getElementById(this.popupId);
            if (viewRef != null) {
                const input = viewRef.querySelector('input');
                if (input) {
                    input.focus();
                } else {
                    const texateara = viewRef.querySelector('textarea');

                    if (texateara) {
                        texateara.focus();
                    }
                }
            }

            if (this.dialog) {
                this.dialog.center();
            }
        }, 500);
    }

    onShowPopup(data: any) {
        this.onReset();

        this.onBeforeShowPopUp(data);
    }

    onReset() {
        this.itemDetail = {};
        this.checkSave = false;
    }

    onAfterShowPopUp() {

    }

    onBeforeShowPopUp(data) {
        this.itemDetail = data;
    }

    closePopupMethod(data: any) {
        this.isShow = false;
        this.closePopup.next(data);
    }

    getMaxWidthDialog() {
        return (window.innerHeight - 200).toString() + 'px';
    }

    onInsert() {
        // this._baseService.post(this.itemDetail)
        //     .then(response => {
        //         this.closePopupMethod(true);
        //         this._notifierService.showInsertDataSuccess();
        //         this.onAfterSave();
        //         this.submitting = false;
        //     }, error => {
        //         this._notifierService.showInsertDataFailed();
        //         this.submitting = false;
        //     });
    }

    onUpdate() {
        // this._baseService.put(this.itemDetail['id'].toString(), this.itemDetail)
        //     .then(response => {
        //         this.closePopupMethod(true);
        //         this._notifierService.showUpdateDataSuccess();
        //         this.onAfterSave();
        //         this.submitting = false;
        //     }, error => {
        //         this._notifierService.showUpdateDataFailed();
        //         this.submitting = false;
        //     });
    }

    cancel() {
        this.closePopupMethod(null);
    }


    resetForm() {
        if (this.pUpload) {
            this.pUpload.clear();
        }

        this.formGroup.reset();
        this.itemDetail = {};
        this.uploadedFiles = [];
        this.submitting = false;
    }

    delete(id: number) {
        // this._notifierService.showDeleteConfirm().then(rs => {
        //     this._baseService.delete(id)
        //         .then(response => {
        //             this.closePopupMethod({});
        //             this._notifierService.showDeleteDataSuccess();
        //         }, error => {
        //             this._notifierService.showDeleteDataError();
        //         });
        // });
    }

    scrollToTop() {
        if (this.formElement) {
            setTimeout(() => {
                this.formElement.nativeElement.scrollIntoView();
            }, 500);
        }
    }

    // getLimitSize(): Promise<number> {
    //     // return new Promise(async (reslove, reject) => {
    //     //     if (!this.limitSize) {
    //     //         this.limitSize = Number(await this._masterDataService.getConfigByCode('SizeOfFile'));
    //     //     }
    //     //     reslove(this.limitSize);
    //     // });
    // }

    isValid(submitting = true) {
        if (this.formGroup.invalid) {
            // this.validationSummary.showValidationSummary();
            this.submitting = false;
            return;
        }

        return this.formGroup.valid;
    }

    togglePopupDelete() {
        this.openPopupDelete = !this.openPopupDelete;
    }

    getMaxDialogHeight() {
        return (window.innerHeight - 200).toString() + 'px';
    }

    resetDialogPosition() {
        window.setTimeout(() => {
            this.dialog.center();
        });
    }

    handleTabChange(event) {
        this.resetDialogPosition();

        this.thispage = event.index;
    }

    getFileName(path) {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === '/') {
                return path.slice(i + 1, path.length);
            }
        }
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
}
