import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import {
  DeviceInterface,
  HardwareBrandInterface,
  HardwareCategoryInterface,
  UpdateDeviceInterface,
} from '@core/models';
import { Checkbox } from 'primeng/checkbox';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';

const MIN_YEAR = 1950;

@Component({
  selector: 'technician-update-device-dialog [isVisible] [device] [brands] [categories]',
  imports: [
    Button,
    Dialog,
    UILabelComponent,
    ReactiveFormsModule,
    InputText,
    Checkbox,
    DatePicker,
    InputNumber,
    Select,
  ],
  templateUrl: './update-device-dialog.component.html',
  styleUrl: './update-device-dialog.component.scss',
})
export class UpdateDeviceDialogComponent implements OnInit {
  @Input() public isVisible = false;
  @Input() public brands!: HardwareBrandInterface[];
  @Input() public categories!: HardwareCategoryInterface[];
  @Input() public device!: DeviceInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<UpdateDeviceInterface>();

  public currentDate = new Date();
  public deviceFormGroup: FormGroup = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    model: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    brandId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    categoryId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    yearOfProduction: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(MIN_YEAR), Validators.max(this.currentDate.getFullYear())],
    }),
    serialNumber: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    hasAddedDate: new FormControl<boolean>(false),
    addedDate: new FormControl<Date | undefined>(undefined),
  });

  public ngOnInit(): void {
    this.deviceFormGroup.patchValue({
      ...this.device,
      brandId: this.device.brand.id,
      categoryId: this.device.category.id,
    });
  }

  public handleUpdateDeviceConfirm(): void {
    if (this.deviceFormGroup.invalid) {
      this.deviceFormGroup.markAllAsTouched();

      return;
    }

    const { hasAddedDate, ...updatedDevice } = this.deviceFormGroup.value;

    if (!hasAddedDate) {
      delete updatedDevice.addedDate;
    }

    this.onConfirm.emit(updatedDevice as UpdateDeviceInterface);
  }

  public handleUpdateDeviceCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
