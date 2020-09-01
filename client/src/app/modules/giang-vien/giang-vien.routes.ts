import {RouterModule, Routes} from '@angular/router';
import {GiangVienListComponent} from './giang-vien-list/giang-vien-list.component';

const routes: Routes = [
    {path: '', component: GiangVienListComponent},
];

export const GiangVienRoutes = RouterModule.forChild(routes);
