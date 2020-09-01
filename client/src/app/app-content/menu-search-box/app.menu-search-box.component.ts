import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from "@angular/router";

@Component({
    selector: 'app-menu-search-box',
    templateUrl: 'app.menu-search-box.component.html'
})
export class AppMenuSearchBoxComponent implements OnInit{

    menuSearchResult: any[];
    menuSearchInput: string;

    isMenuSearchInputFocus: boolean = false;

    constructor(
        public app: AppComponent,
        private _router: Router,
    ) {

    }

    ngOnInit(): void {

    }

    onMenuSearch(event) {
        this.menuSearchResult = [];

        if (!event || !event.query) {
            return;
        }

        this.menuSearchResult = this.getMenuSearchResult(event.query);
    }

    getMenuSearchResult(keyword) {
        let result = [];

        this.regroupMenuSearchResult(keyword, this.app.appMenuModel, result);

        return result;
    }

    private regroupMenuSearchResult(keyword: string, listToGet: any[], listToPush: any[]) {
        listToGet.forEach(item => {
            if (item.items && item.items.length) {
                this.regroupMenuSearchResult(keyword, item.items, listToPush);
            }

            if (item.trangThai === 1
                && (item.label.toUpperCase().indexOf(keyword.toUpperCase()) >= 0)) {
                listToPush.push(item);
            }
        });
    }

    onSelectMenuSuggestion(menuItemObj) {
        this._router.navigateByUrl(menuItemObj.routerLink);
        this.menuSearchInput = '';
    }

    onBlurMenuSearchInput(event) {
        this.isMenuSearchInputFocus = false;
        this.menuSearchInput = '';
    }

    onFocusMenuSearchInput(event) {
        this.isMenuSearchInputFocus = true;
    }
}
