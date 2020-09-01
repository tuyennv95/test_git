import { Component, Injector, OnInit } from '@angular/core';
import {SecondPageEditBase} from "../../../../base/second-page-edit-base";

@Component({
    selector: 'modal-form',
    templateUrl: './form.component.html'
})

export class Modal_formComponent extends SecondPageEditBase implements OnInit {
    display: boolean = false;
    selectItems = [];

    constructor(
        protected _injector: Injector,
    ) {
        super(_injector);
    }

    ngOnInit(): void {
        this.selectItems = [
            {label: 'Lựa chọn 1', value: 1},
            {label: 'Lựa chọn 2', value: 2},
            {label: 'Lựa chọn 3', value: 3},
            {label: 'Lựa chọn 4', value: 4}
        ];
    }
}
