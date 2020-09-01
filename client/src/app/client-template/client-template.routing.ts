import {RouterModule, Routes} from '@angular/router';
import {ButtonComponent} from './element/button/button.component';
import {NotificationComponent} from './element/notification/notification.component';
import {BreadcrumbComponemt} from './element/breadcrumb/breadcrumb.componemt';
import {FieldComponent} from './element/field/field.component';
import {DataTableComponent} from "./element/data-table/data-table.component";
import {ModalComponent} from "./element/modal/modal.component";

const routes: Routes = [
    {path: '', component: DataTableComponent},
    {path: 'button', component: ButtonComponent},
    {path: 'notification', component: NotificationComponent},
    {path: 'breadcrumb', component: BreadcrumbComponemt},
    {path: 'field', component: FieldComponent},
    {path: 'data-table', component: DataTableComponent},
    {path: 'modal', component: ModalComponent},
];

export const ClientTemplateRoutes = RouterModule.forChild(routes);
