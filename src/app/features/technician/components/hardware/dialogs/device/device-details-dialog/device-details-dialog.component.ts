import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { DeviceInterface } from '@core/models/device.interface';
import { Button } from 'primeng/button';
import {
  DeviceDetailsComponent,
} from '@features/technician/components/hardware/device-details/device-details.component';

@Component({
  selector: 'technician-device-details-dialog [isVisible] [device]',
  imports: [Dialog, DeviceDetailsComponent, Button],
  templateUrl: './device-details-dialog.component.html',
  styleUrl: './device-details-dialog.component.scss',
})
export class DeviceDetailsDialogComponent {
  @Input() public isVisible = false;
  @Input() public device!: DeviceInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onUpdateDevice = new EventEmitter<void>();
  @Output() public onDeleteDevice = new EventEmitter<void>();

  public handleDeleteDevice(): void {
    this.isVisibleChange.emit(false);
    this.onDeleteDevice.emit();
  }

  public handleUpdateDevice(): void {
    this.isVisibleChange.emit(false);
    this.onUpdateDevice.emit();
  }
}
