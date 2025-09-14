import {Component, EventEmitter, Input, Output, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <input [type]="type"
           [placeholder]="placeholder"
           [value]="value"
           (input)="onInput($any($event.target).value)"
           (blur)="onTouched()">
  `,
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  private internalValue: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.internalValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @Input()
  get value(): any {
    return this.internalValue;
  }
  set value(val: any) {
    this.internalValue = val;
    this.onChange(val);
    this.valueChange.emit(val);
  }

  onInput(value: any): void {
    this.internalValue = value;
    this.onChange(this.internalValue);
    this.valueChange.emit(this.internalValue);
  }
}
