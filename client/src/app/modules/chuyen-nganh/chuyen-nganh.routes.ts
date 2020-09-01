import {RouterModule, Routes} from '@angular/router';
import {ChuyenNganhListComponent} from "./chuyen-nganh-list/chuyen-nganh-list.component";

const routes: Routes = [
    {path: '', component: ChuyenNganhListComponent},
];

export const ChuyenNganhRoutes = RouterModule.forChild(routes);
