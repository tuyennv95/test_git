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
import {NgxDocViewerModule} from "ngx-doc-viewer";
import {TtcnKltnListComponent} from "./ttcn-kltn-list/ttcn-kltn-list.component";
import {TtcnKltnRoutes} from "./ttcn-kltn.routes";
import {UpdateTtcnKltnComponent} from "./update-ttcn-kltn/update-ttcn-kltn.component";
import {TtcnKltnDetailComponent} from "./ttcn-kltn-detail/ttcn-kltn-detail.component";
import {DuyetTtcnKltnComponent} from "./duyet-ttcn-kltn/duyet-ttcn-kltn.component";
import {XemTruocFileComponent} from "./xem-truoc-file/xem-truoc-file.component";
import {YeuCauTaiLieuComponent} from "./yeu-cau-tai-lieu/yeu-cau-tai-lieu.component";

@NgModule({
    imports: [
        TtcnKltnRoutes,
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
        TtcnKltnListComponent,
        UpdateTtcnKltnComponent,
        TtcnKltnDetailComponent,
        YeuCauTaiLieuComponent,
        DuyetTtcnKltnComponent,
        XemTruocFileComponent
    ]
})
export class TtcnKltnModule {
}
