import {Component, Injector, OnInit} from '@angular/core';
import {SecondPageEditBase} from '../../../base/second-page-edit-base';
import {
    DepartmentControllerService,
    LecturerControllerService, LecturerSubjectControllerService,
    RangeControllerService,
    SubjectControllerService
} from "../../../swagger";
import {Globals} from "../../../base/globals";
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/forkJoin";

@Component({
    selector: 'modal-update-mon-hoc',
    templateUrl: './update-mon-hoc.component.html',
    styleUrls: ['/update-mon-hoc.component.scss']
})

export class UpdateMonHocComponent extends SecondPageEditBase implements OnInit {
    title;

    department_options: any[];
    type_options: any[];

    rangeList: any[] = [];

    lecturerList: any[] = [];
    lecturerSelectList: any[] = [];
    departmentList: any[] = [];

    editPage;

    constructor(
        protected _injector: Injector,
        private subjectControllerService: SubjectControllerService,
        private departmentControllerService: DepartmentControllerService,
        private rangeControllerService: RangeControllerService,
        private lecturerControllerService: LecturerControllerService,
        private lecturerSubjectControllerService: LecturerSubjectControllerService,
        public globals: Globals
    ) {
        super(_injector);
    }

    ngOnInit(): void {
    }

    onShowPopup(data: any) {
        console.log(data);

        this.onReset();

        if (data.id) {
            this.title = "Cập nhật Môn học: " + data.subjectName;
            this.editPage = true;
        } else {
            this.title = "Thêm mới Môn học";
            this.editPage = false;
        }

        this.loadStaticOptions();
        this.loadDynamicOptions();
        this.onBeforeShowPopUp(data);
    }

    loadStaticOptions() {
        this.department_options = [
            {label: '--- Chọn Bộ môn ---', value: null}
        ];

        this.type_options = [
            {label: '--- Chọn Loại môn học ---', value: null},
        ];
    }

    loadDynamicOptions() {
        this.departmentControllerService.getDepartmentsListUsingGET().subscribe(result => {
            this.department_options = this.department_options.concat(this.convertDataToOptions(result, 'departmentName'));
            this.departmentList = result;
        });

        for (const property in this.globals.LOAI_MON_HOC) {
            this.type_options.push({label: this.globals.LOAI_MON_HOC[property], value: property});
        }
    }

    onBeforeShowPopUp(data) {
        this.itemDetail = data;
        this.lecturerList = [];
        this.lecturerSelectList = [];
        this.rangeList = [];

        this.lecturerControllerService.getLecturerResultListUsingPOST().subscribe(result => {
            this.lecturerList = result.items;

            if (this.lecturerList) {
                this.loadSelectLecturer();
            }
        });

        this.rangeControllerService.getRangesListUsingPOST().subscribe(result => {
            this.rangeList = result.items;

            if (this.rangeList) {
                this.loadSelectRange();
            }
        });

        if (this.editPage) {
            let a = this.lecturerSubjectControllerService
                .getLecturerSubjectsListUsingPOST({"subjectId": this.itemDetail.id});


            Observable.forkJoin(a).subscribe(res => {
                this.lecturerSelectList = res[0];
            });
        }
    }

    loadSelectLecturer() {
        this.lecturerSelectList.forEach(item => {
            let tg = this.lecturerList.find(lecturer => lecturer.lecturerCode === item.lecturerCode);
            tg.checked = true;
        });
    }

    loadSelectRange() {
        if (!this.itemDetail.rangeIds) {
            return;
        }

        let array = this.itemDetail.rangeIds.split(",").map(Number);

        array.forEach(item => {
            (this.rangeList.find(tg => tg.id === item)).checked = true;
        })
    }

    getlistLecturerByDepartmentId(id) {
        return this.lecturerList.filter(item => item.departmentId === id);
    }

    getLecturerView(item) {
        let fullName = item.firstName + " " + item.lastName;
        return "(" + item.title + ") " + fullName;
    }

    onSave() {
        this.checkSave = true;

        if (this.itemDetail.subjectCode && this.itemDetail.subjectName && this.itemDetail.type
            && this.itemDetail.departmentId) {

            let ids = [];
            let idsRangeSelect = this.rangeList.filter(item => item.checked === true);

            idsRangeSelect.forEach(item => {
                ids.push(item.id);
            });

            this.itemDetail.rangeIds = ids.toString();

            if (!this.editPage) {
                this.subjectControllerService.createSubjectUsingPOST(this.itemDetail).subscribe(result => {
                    if (result) {
                        this.itemDetail.id = result.id;
                        this.addLecturerSubject();
                        this.closePopupMethod(result);
                    }
                });
            } else {
                this.subjectControllerService.updateSubjectUsingPUT(this.itemDetail).subscribe(resut => {
                    if (resut) {
                        this.addLecturerSubject();
                        this.closePopupMethod(resut);
                    }
                });
            }
        }
    }

    addLecturerSubject() {
        let ids = [];
        let idsLecturerSelect = this.lecturerList.filter(item => item.checked === true);

        idsLecturerSelect.forEach(item => {
            ids.push(item.lecturerCode);
        });

        if (ids.length > 0) {
            // thêm vào lecturer subject
            this.lecturerSubjectControllerService.updateLecturerSubjectUsingPOST(this.itemDetail.id, ids)
                .subscribe(result => {
                    console.log("update lecturer-subject: ", result);
                })
        }
    }

    onDelete(code) {
        if (code) {
            this.subjectControllerService.deleteSubjectUsingPOST([code]).subscribe(resut => {
                this.closePopupMethod(resut);
            });
        }
    }
}
