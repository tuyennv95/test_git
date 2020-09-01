import {RouterModule, Routes} from '@angular/router';
import {BoMonListComponent} from './bo-mon-list/bo-mon-list.component';

const routes: Routes = [
    {path: '', component: BoMonListComponent},
];

export const BoMonRoutes = RouterModule.forChild(routes);
