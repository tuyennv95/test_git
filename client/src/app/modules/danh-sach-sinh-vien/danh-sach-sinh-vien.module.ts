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
import {DanhSachSinhVienRoutes} from "./danh-sach-sinh-vien.routes";
import {DanhSachSinhVienListComponent} from "./danh-sach-sinh-vien-list/danh-sach-sinh-vien-list.component";
import {UpdateDanhSachSinhVienComponent} from "./update-danh-sach-sinh-vien/update-danh-sach-sinh-vien.component";

@NgModule({
    imports: [
        DanhSachSinhVienRoutes,
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
        DanhSachSinhVienListComponent,
        UpdateDanhSachSinhVienComponent
    ]
})
export class DanhSachSinhVienModule {
}
