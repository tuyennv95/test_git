import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MultiSelectModule, OverlayPanelModule, PaginatorModule, RadioButtonModule, ScrollPanelModule, TabViewModule,
    TooltipModule, TreeModule,
    TriStateCheckboxModule
} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChuyenNganhRoutes} from "./chuyen-nganh.routes";
import {ChuyenNganhListComponent} from "./chuyen-nganh-list/chuyen-nganh-list.component";
import {UpdateChuyenNganhComponent} from "./update-chuyen-nganh/update-chuyen-nganh.component";

@NgModule({
    imports: [
        ChuyenNganhRoutes,
        CommonModule,
        DialogModule,
        ButtonModule,
        ConfirmDialogModule,
        ToastModule,
        TableModule,
        TooltipModule,
        ReactiveFormsModule,
        CheckboxModule,
        TriStateCheckboxModule,
        FormsModule,
        MultiSelectModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        EditorModule,
        FileUploadModule,
        ListboxModule,
        DialogModule,
        PaginatorModule,
        OverlayPanelModule,
        TreeModule,
        DropdownModule,
        ScrollPanelModule,
        TabViewModule,
        RadioButtonModule
    ],
    declarations: [
        ChuyenNganhListComponent,
        UpdateChuyenNganhComponent,
    ]
})
export class ChuyenNganhModule {
}
