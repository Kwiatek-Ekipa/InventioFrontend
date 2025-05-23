import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Fieldset } from 'primeng/fieldset';
import { DeviceInterface } from '@core/models';

@Component({
  selector: 'technician-device-details [device]',
  imports: [DatePipe, Fieldset],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss',
})
export class DeviceDetailsComponent {
  @Input() public device!: DeviceInterface;
}
