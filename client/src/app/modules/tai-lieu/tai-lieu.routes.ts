import {RouterModule, Routes} from '@angular/router';
import {TaiLieuListComponent} from './tai-lieu-list/tai-lieu-list.component';
import {TaiLieuDetailComponent} from './tai-lieu-detail/tai-lieu-detail.component';

const routes: Routes = [
    {path: '', component: TaiLieuListComponent},
    {path: 'detail/:id', component: TaiLieuDetailComponent},
];

export const TaiLieuRoutes = RouterModule.forChild(routes);
