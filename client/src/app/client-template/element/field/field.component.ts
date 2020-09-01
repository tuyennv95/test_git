import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-field',
    styleUrls: ['./field.component.scss'],
    templateUrl: './field.component.html'
})

export class FieldComponent implements OnInit {
    items = [];
    radio: any;
    checkbox: any;
    number: any;
    triStateCheckbox: any;

    constructor() {
    }

    ngOnInit(): void {
        this.items = [
            {label: 'New York', value: 'NY'},
            {label: 'Rome', value: 'RM'},
            {label: 'London', value: 'LDN'},
            {label: 'Istanbul', value: 'IST'},
            {label: 'Paris', value: 'PRS'}
        ];

        this.checkbox = {
            caseChecked: true,
            caseUncheck: false
        };

        this.triStateCheckbox = {
            caseChecked: true,
            caseIndeterminate: false,
            caseUncheck: null
        };

        this.number = {
            input1: 0,
            input2: 0,
            input3: 0
        };

        this.radio = {
            group1: 'val1',
            group2: 'val1',
            group3: 'val1',
            group4: 'val1'
        };
    }

    selected($event: Object) {
    }

    onClose($event: any) {
    }

    onChange($event) {
    }

    onIndeterminateChange($event: boolean) {
    }
}
