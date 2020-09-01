import {Component, Injector, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from '../../app.component';
import {Subject} from 'rxjs/internal/Subject';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" [level]="0" root="true" class="tn-main-menu"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    private _unsubscribeAll = new Subject<any>();

    model: any[];


    constructor(public app: AppComponent, private _injector: Injector) {
    }

    ngOnInit() {
        this.model = this.app.appMenuModel;
    }
}

@Component({
    selector: '[app-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="[
                isActive(i, child) ? 'activated' : '',
                isNumber(level) ? 'menu-item-level-' + level : '',
                child.items && (!child.routerLink || child.routerLink === '#') ? 'has-submenu' : '',
                child.id ? 'menu-id-' + child.id : ''
            ]"
                *ngIf="child.visible !== false" [hidden]="child.trangThai !== 1">

                <a (click)="itemClick($event,child,i,level)" class="__ripple-link"
                   *ngIf="!child.routerLink || child.routerLink === '#'"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="__main-icon" [ngClass]="child.icon" *ngIf="level === 1"></i>

                    <span class="__label">{{child.label}}</span>

                    <i class="ci ci-chevron-right-1 __toggle-icon" *ngIf="level > 0"></i>
                </a>

                <a (click)="itemClick($event,child,i,level)" class="__ripple-link"
                   *ngIf="child.routerLink && child.routerLink !== '#'"
                   [routerLink]="child.routerLink"
                   [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i class="__main-icon" [ngClass]="child.icon" *ngIf="level === 1"></i>

                    <span class="__label">{{child.label}}</span>

                    <i class="ci ci-chevron-right-1 __toggle-icon" *ngIf="level > 0"></i>
                </a>

                <ul app-submenu [item]="child" [level]="level + 1" *ngIf="child.items && level < 3"
                    [ngClass]="[
                        'submenu-level-' + (level + 1)
                    ]"
                    [hidden]="child.routerLink && child.routerLink !== '#'"
                    [visible]="isActive(i, child)" [reset]="reset"
                    [parentActive]="isActive(i, child)"
                    [groupIndex]="root ? i : groupIndex"
                    [@children]="level > 0 ? (isActive(i, child) ? 'visibleAnimated' : 'hiddenAnimated') : 'visible'">
                </ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                display: 'block'
            })),
            state('hidden', style({
                display: 'none'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})

export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    @Input() parentItem: MenuItem;

    // index trong vòng for của nhóm menu item (menu level 0)
    @Input() groupIndex: number;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    isFirstLoad = true;

    @Input() level: number;

    constructor(public app: AppComponent, private _router: Router) {
    }

    itemClick(event: Event, item: MenuItem, index: number, level: number) {
        if (level === 0) {
            return;
        }

        this.isFirstLoad = false;

        this.app.isMenuClicked = true;

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (this.app.activatedMenuGroupIndex !== this.groupIndex) {
            this.activeIndex = index;
        } else {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }

        this.app.activatedMenuGroupIndex = this.groupIndex;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            // setTimeout(() => {
            //     this.app.layoutMenuScrollerViewChild.moveBar();
            // }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }

        if (item.url || item.routerLink) {
            this.activeIndex = null;
            this.isFirstLoad = true;

            this._router.navigate([item.routerLink]);
        }
    }

    isActive(index: number, currentItem: any): boolean {
        if (this.app.isMenuClicked && this.app.activatedMenuGroupIndex !== this.groupIndex) {
            return false;
        }

        if (!this.isFirstLoad) {
            return this.activeIndex == index;
        }

        if (currentItem && currentItem.routerLink) {
            if (this.isSameWithCurrentPageURL(currentItem.routerLink)) {
                this.activeIndex = index;
                return true;
            }
        }

        if (currentItem && currentItem.items) {
            for (let i in currentItem.items) {
                let childItem = currentItem.items[i];

                if (this.isActive(index, childItem)) {
                    return true;
                }
            }
        }

        return false;
    }

    private isSameWithCurrentPageURL(routerLink): boolean {
        const currentUrl = this._router.url;

        if (routerLink === currentUrl) {
            return true;
        }

        let currentUrlWithoutParam = currentUrl;

        if (currentUrlWithoutParam.includes('?')) {
            currentUrlWithoutParam = currentUrlWithoutParam.substr(0, currentUrlWithoutParam.indexOf('?'));
        }

        currentUrlWithoutParam = currentUrlWithoutParam.replace(/\d+/g, (str) => '--');

        return currentUrlWithoutParam === routerLink;
    }

    isNumber(element: any): boolean {
        return !isNaN(element);
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}

