import {RouterModule, Routes} from '@angular/router';
import {MonHocListComponent} from './mon-hoc-list/mon-hoc-list.component';

const routes: Routes = [
    {path: '', component: MonHocListComponent},
];

export const MonHocRoutes = RouterModule.forChild(routes);
