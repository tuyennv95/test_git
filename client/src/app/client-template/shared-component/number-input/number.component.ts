import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Used to emit changes performed on number input components.
 * @export
 * @class TnNumberChange
 */
export class TnNumberChange {
    /**
     * Contains the `Number` that has been changed.
     * @type {Number}
     * @memberof TnNumberChange
     */
    source: TnNumberInput;
    /**
     * The value of the `Number` field encompassed in the `TnNumberChange` class.
     * @type {number}
     * @memberof TnNumberChange
     */
    value: number;
}

/**
 * @export
 * @class TnNumberInput
 * @implements {ControlValueAccessor}
 */
@Component({
    selector: 'tn-number-input',
    template: `        
        <div data-numberinput class="bx--number" [class.state-disabled]="disabled">
            <div class="bx--number__input-wrapper">
                <input
                    class="bx--number__input"
                    type="number"
                    [id]="id"
                    [value]="value"
                    [min]="min"
                    [max]="max"
                    [disabled]="disabled"
                    [required]="required"
                    (input)="onNumberInputChange($event)"/>
                
                <div class="bx--number__controls">
                    <button
                        class="bx--number__control-btn up-icon"
                        type="button"
                        aria-live="polite"
                        aria-atomic="true"
                        (click)="onIncrement()">
                        <span class="ci ci-caret-up"></span>
                    </button>
                    
                    <button
                        class="bx--number__control-btn down-icon"
                        type="button"
                        aria-live="polite"
                        aria-atomic="true"
                        (click)="onDecrement()">
                        <span class="ci ci-caret-down"></span>
                    </button>
                </div>
            </div>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TnNumberInput,
            multi: true
        }
    ]
})
export class TnNumberInput implements ControlValueAccessor {
    /**
     * Variable used for creating unique ids for number input components.
     */
    static numberCount = 0;
    /**
     * Set to `true` for a disabled number input.
     */
    @Input() disabled = false;
    /**
     * The unique id for the number component.
     */
    @Input() id = `number-${TnNumberInput.numberCount}`;
    /**
     * Reflects the required attribute of the `input` element.
     */
    @Input() required: boolean;
    /**
     * Sets the value attribute on the `input` element.
     */
    @Input() value = 0;
    /**
     * Sets the min attribute on the `input` element.
     */
    @Input() min;
    /**
     * Sets the max attribute on the `input` element.
     */
    @Input() max;
    /**
     * Emits event notifying other classes when a change in state occurs in the input.
     */
    @Output() change = new EventEmitter<TnNumberChange>();

    /**
     * Creates an instance of `Number`.
     * @memberof Number
     */
    constructor() {
        TnNumberInput.numberCount++;
    }

    /**
     * This is the initial value set to the component
     * @param value The input value.
     */
    public writeValue(value: any) {
        this.value = value;
    }

    /**
     * Sets a method in order to propagate changes back to the form.
     * @param {any} fn
     * @memberof Number
     */
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    /**
     * Registers a callback to be triggered when the control has been touched.
     * @param fn Callback to be triggered when the number input is touched.
     */
    public registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    /**
     * Sets the disabled state through the model
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /**
     * Called when number input is blurred. Needed to properly implement `ControlValueAccessor`.
     * @memberof Number
     */
    onTouched: () => any = () => {
    };

    /**
     * Method set in `registerOnChange` to propagate changes back to the form.
     * @memberof Number
     */
    propagateChange = (_: any) => {
    };

    /**
     * Adds 1 to the current `value`.
     */
    onIncrement(): void {
        if (this.isNullOrUndefined(this.max) || this.value < this.max) {
            this.value++;
            this.emitChangeEvent();
        }
    }

    /**
     * Subtracts 1 to the current `value`.
     */
    onDecrement(): void {
        if (this.isNullOrUndefined(this.min) || this.value > this.min) {
            this.value--;
            this.emitChangeEvent();
        }
    }

    /**
     * Creates a class of `TnNumberChange` to emit the change in the `Number`.
     */
    emitChangeEvent(): void {
        let event = new TnNumberChange();
        event.source = this;
        event.value = this.value;
        this.change.emit(event);
        this.propagateChange(this.value);
    }

    onNumberInputChange(event) {
        this.value = event.target.value;
        this.emitChangeEvent();
    }

    // helper

    private isNullOrUndefined(value) {
        return value === null || value === undefined;
    }
}
