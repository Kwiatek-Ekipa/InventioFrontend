import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { CreateDeviceInterface } from '@core/models/device.interface';
import { HardwareBrandInterface, HardwareCategoryInterface } from '@core/models';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Checkbox } from 'primeng/checkbox';

const MIN_YEAR = 1950;

@Component({
  selector: 'technician-create-device-dialog [isVisible] [brands] [categories]',
  imports: [
    Button,
    Dialog,
    UILabelComponent,
    ReactiveFormsModule,
    InputText,
    InputNumber,
    Select,
    DatePicker,
    Checkbox,
  ],
  templateUrl: './create-device-dialog.component.html',
  styleUrl: './create-device-dialog.component.scss',
})
export class CreateDeviceDialogComponent {
  @Input() public isVisible = false;
  @Input() public brands!: HardwareBrandInterface[];
  @Input() public categories!: HardwareCategoryInterface[];

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<CreateDeviceInterface>();

  public readonly currentDate = new Date();
  public deviceFormGroup = new FormGroup({
    model: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    brandId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    categoryId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    yearOfProduction: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(MIN_YEAR), Validators.max(this.currentDate.getFullYear())],
    }),
    serialNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    hasAddedDate: new FormControl<boolean>(false),
    addedDate: new FormControl<Date | undefined>(new Date()),
  });

  public handleCreateCategoryConfirm(): void {
    if (this.deviceFormGroup.invalid) {
      this.deviceFormGroup.markAllAsTouched();

      return;
    }

    const { hasAddedDate, ...newDevice } = this.deviceFormGroup.value;

    if (!hasAddedDate) {
      delete newDevice.addedDate;
    }

    this.onConfirm.emit(newDevice as CreateDeviceInterface);
  }

  public handleCreateCategoryCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
