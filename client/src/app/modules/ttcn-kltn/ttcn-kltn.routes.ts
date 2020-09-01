import {RouterModule, Routes} from '@angular/router';
import {TtcnKltnListComponent} from "./ttcn-kltn-list/ttcn-kltn-list.component";

const routes: Routes = [
    {path: '', component: TtcnKltnListComponent},
];

export const TtcnKltnRoutes = RouterModule.forChild(routes);
