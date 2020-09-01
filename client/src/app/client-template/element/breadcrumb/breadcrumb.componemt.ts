import { Component, OnInit } from '@angular/core';

let breadcrumbItems;

@Component({
    selector: 'app-client-template-breadcrumb',
    templateUrl: 'breadcrumb.componemt.html'
})
export class BreadcrumbComponemt {

    createBreadcrumbItems = (count: number): Array<any> => {
        if (breadcrumbItems && count === breadcrumbItems.length) {
            return breadcrumbItems;
        }

        breadcrumbItems = Array(count)
            .fill(0)
            .map((x, i) => ({ label: ' Breadcrumb ' + (i + 1), href: 'javascript:void(0)' + (i + 1) }));
        return breadcrumbItems;
    };
}
