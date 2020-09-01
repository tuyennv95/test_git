import {RouterModule, Routes} from '@angular/router';
import {DanhSachSinhVienListComponent} from "./danh-sach-sinh-vien-list/danh-sach-sinh-vien-list.component";

const routes: Routes = [
    {path: '', component: DanhSachSinhVienListComponent},
];

export const DanhSachSinhVienRoutes = RouterModule.forChild(routes);
