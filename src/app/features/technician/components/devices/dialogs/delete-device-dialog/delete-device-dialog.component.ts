import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DeviceInterface } from '@core/models/device.interface';
import {
  DeviceDetailsComponent,
} from '@features/technician/components/devices/device-details/device-details.component';
import { IrreversibleOperationTagComponent } from '@ui';

@Component({
  selector: 'technician-delete-device-dialog [isVisible] [device]',
  imports: [Button, Dialog, DeviceDetailsComponent, IrreversibleOperationTagComponent],
  templateUrl: './delete-device-dialog.component.html',
  styleUrl: './delete-device-dialog.component.scss',
})
export class DeleteDeviceDialogComponent {
  @Input() public isVisible = false;
  @Input() public device!: DeviceInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<void>();

  public handleDeleteBrandConfirm(): void {
    this.onConfirm.emit();
  }

  public handleDeleteBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
