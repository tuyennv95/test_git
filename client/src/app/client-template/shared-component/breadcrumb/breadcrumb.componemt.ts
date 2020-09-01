import {AfterContentInit, Component, ContentChildren, Input, QueryList} from '@angular/core';

const MINIMUM_OVERFLOW_THRESHOLD = 4;

@Component({
    selector: 'tn-breadcrumb',
    templateUrl: 'breadcrumb.componemt.html'
})
export class TnBreadcrumbComponemt implements AfterContentInit {

    @Input() items;

    @Input() noTrailingSlash = false;

    @Input() ariaLabel: string;

    protected _threshold: number;
    protected _skeleton = false;

    get skeleton(): any {
        return this._skeleton;
    }

    @Input()
    set threshold(threshold: number) {
        this._threshold = threshold;

        if (isNaN(threshold) || threshold < MINIMUM_OVERFLOW_THRESHOLD) {
            this._threshold = MINIMUM_OVERFLOW_THRESHOLD;
        }
    }

    get threshold(): number {
        return this._threshold;
    }

    ngAfterContentInit() {
        this.updateChildren();
    }

    get shouldShowContent(): boolean {
        return !this.items;
    }

    get shouldShowOverflow(): boolean {
        if (!this.items) {
            return false;
        }

        return this.items.length > this.threshold;
    }

    get first() {
        return this.shouldShowOverflow ? this.items[0] : null;
    }

    get overflowItems() {
        return this.shouldShowOverflow ? this.items.slice(1, this.items.length - 2) : [];
    }

    get secondLast() {
        return this.shouldShowOverflow ? this.items[this.items.length - 2] : null;
    }

    get last() {
        return this.shouldShowOverflow ? this.items[this.items.length - 1] : null;
    }

    protected updateChildren() {
        // if (this.children) {
        //     this.children.toArray().forEach(child => child.skeleton = this.skeleton);
        // }
    }
}
