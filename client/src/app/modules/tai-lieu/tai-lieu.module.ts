import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaiLieuRoutes} from './tai-lieu.routes';
import {TaiLieuListComponent} from './tai-lieu-list/tai-lieu-list.component';
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
import {UpdateTaiLieuComponent} from "./update-tai-lieu/update-tai-lieu.component";
import {TaiLieuDetailComponent} from './tai-lieu-detail/tai-lieu-detail.component';
import {YeuCauTaiLieuComponent} from './yeu-cau-tai-lieu/yeu-cau-tai-lieu.component';
import {DuyetTaiLieuComponent} from "./duyet-tai-lieu/duyet-tai-lieu.component";
import {XemTruocFileComponent} from "./xem-truoc-file/xem-truoc-file.component";
import {NgxDocViewerModule} from "ngx-doc-viewer";

@NgModule({
    imports: [
        TaiLieuRoutes,
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
        RadioButtonModule,
        NgxDocViewerModule
    ],
    declarations: [
        TaiLieuListComponent,
        UpdateTaiLieuComponent,
        TaiLieuDetailComponent,
        YeuCauTaiLieuComponent,
        DuyetTaiLieuComponent,
        XemTruocFileComponent
    ]
})
export class TaiLieuModule {
}
