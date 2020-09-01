import { Component, OnInit, ViewChild } from '@angular/core';
import { Modal_formComponent } from '../../shared-component/modal/form/form.component';
import {Modal_tabsComponent} from '../../shared-component/modal/tabs/tabs.component';

@Component({
    selector: 'app-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {
    @ViewChild(Modal_formComponent)
    modal_form: Modal_formComponent;

    @ViewChild(Modal_tabsComponent)
    modal_tabs: Modal_tabsComponent;

    ngOnInit(): void {
        this.modal_form.showPopup();
    }
}
