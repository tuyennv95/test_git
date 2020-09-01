import {RouterModule, Routes} from '@angular/router';
import {DanhSachYeuCauListComponent} from "./danh-sach-yeu-cau-list/danh-sach-yeu-cau-list.component";

const routes: Routes = [
    {path: '', component: DanhSachYeuCauListComponent},
];

export const DanhSachYeuCauRoutes = RouterModule.forChild(routes);
