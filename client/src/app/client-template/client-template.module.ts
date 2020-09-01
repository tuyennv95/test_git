import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientTemplateRoutes} from './client-template.routing';
import {TableModule} from 'primeng/table';
import {
    CalendarModule, CheckboxModule,
    ConfirmDialogModule, DropdownModule,
    EditorModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule, RadioButtonModule, ScrollPanelModule,
    TabViewModule,
    TreeModule, TriStateCheckboxModule
} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ButtonComponent} from './element/button/button.component';
import {BreadcrumbComponemt} from './element/breadcrumb/breadcrumb.componemt';
import {NotificationComponent} from './element/notification/notification.component';
import {TnBreadcrumbComponemt} from './shared-component/breadcrumb/breadcrumb.componemt';
import {FieldComponent} from './element/field/field.component';
import {TnNumberInput} from './shared-component/number-input/number.component';
import {DataTableComponent} from "./element/data-table/data-table.component";
import {Modal_tabsComponent} from "./shared-component/modal/tabs/tabs.component";
import {Modal_formComponent} from "./shared-component/modal/form/form.component";
import {ModalComponent} from "./element/modal/modal.component";

@NgModule({
    imports: [
        ClientTemplateRoutes,
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
    exports: [
        NotificationComponent
    ],
    declarations: [
        TnBreadcrumbComponemt,
        TnNumberInput,
        ButtonComponent,
        NotificationComponent,
        BreadcrumbComponemt,
        FieldComponent,
        DataTableComponent,
        Modal_tabsComponent,
        Modal_formComponent,
        ModalComponent
    ]
})
export class ClientTemplateModule {
}
