import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
    constructor(public app: AppComponent) {

    }

    ngOnInit(): void {

    }
}
