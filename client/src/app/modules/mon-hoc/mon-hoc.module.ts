import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonHocRoutes} from './mon-hoc.routes';
import {MonHocListComponent} from './mon-hoc-list/mon-hoc-list.component';
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
import {UpdateMonHocComponent} from "./update-mon-hoc/update-mon-hoc.component";

@NgModule({
    imports: [
        MonHocRoutes,
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
        MonHocListComponent,
        UpdateMonHocComponent
    ]
})
export class MonHocModule {
}
