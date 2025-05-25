import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonGroup } from 'primeng/buttongroup';
import { CreateDeviceInterface, DeviceInterface, UpdateDeviceInterface } from '@core/models/device.interface';
import { DeviceApiService } from '@core/services/api-services/device-api.service';
import { HardwareBrandApiService, HardwareCategoryApiService } from '@core/services';
import { HardwareBrandInterface, HardwareCategoryInterface } from '@core/models';
import { Fieldset } from 'primeng/fieldset';
import { UILabelComponent } from '@ui';
import { InputNumber } from 'primeng/inputnumber';
import { MultiSelect } from 'primeng/multiselect';
import { SearchDeviceType } from '@core/types';
import { CreateDeviceDialogComponent } from '@features/technician/components/devices/dialogs/create-device-dialog/create-device-dialog.component';
import { DeleteDeviceDialogComponent } from '@features/technician/components/devices/dialogs/delete-device-dialog/delete-device-dialog.component';
import { DeviceDetailsDialogComponent } from '@features/technician/components/devices/dialogs/device-details-dialog/device-details-dialog.component';
import { UpdateDeviceDialogComponent } from '@features/technician/components/devices/dialogs/update-device-dialog/update-device-dialog.component';

@Component({
  selector: 'technician-devices',
  imports: [
    Card,
    TableModule,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    Button,
    ProgressSpinner,
    ButtonGroup,
    Fieldset,
    UILabelComponent,
    InputNumber,
    MultiSelect,
    CreateDeviceDialogComponent,
    DeleteDeviceDialogComponent,
    DeviceDetailsDialogComponent,
    UpdateDeviceDialogComponent,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  public selectedDevice: DeviceInterface | undefined;
  public devices: DeviceInterface[] = [];
  public brands: HardwareBrandInterface[] = [];
  public categories: HardwareCategoryInterface[] = [];
  public isLoading: boolean = true;

  public showCreateDeviceDialog = false;
  public showDeviceDetailsDialog = false;
  public showUpdateDeviceDialog = false;
  public showDeleteDeviceDialog = false;

  public searchParametersFormGroup = new FormGroup({
    model: new FormControl<string | undefined>(undefined),
    serialNumber: new FormControl<string | undefined>(undefined),
    brandId: new FormControl<string[]>([]),
    categoryId: new FormControl<string[]>([]),
    yearOfProductionGte: new FormControl<number | undefined>(undefined),
    yearOfProductionLte: new FormControl<number | undefined>(undefined),
  });

  public constructor(
    private _deviceApiService: DeviceApiService,
    private _categoryApiService: HardwareCategoryApiService,
    private _brandApiService: HardwareBrandApiService,
  ) {
    this.searchParametersFormGroup.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((): void => this.fetchDevices());
    this.fetchDevices();
    this.fetchBrands();
    this.fetchCategories();
  }

  public fetchDevices(): void {
    const searchParameters: SearchDeviceType = this.searchParametersFormGroup.value as SearchDeviceType;

    this._deviceApiService
      .searchDevices(searchParameters)
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((devices: DeviceInterface[]): void => {
        this.devices = devices;
      });
  }

  public fetchBrands(): void {
    this._brandApiService
      .searchBrands('')
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((brands: HardwareBrandInterface[]): void => {
        this.brands = brands;
      });
  }

  public fetchCategories(): void {
    this._categoryApiService
      .searchCategories('')
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((categories: HardwareCategoryInterface[]): void => {
        this.categories = categories;
      });
  }

  public handleUpdateDevice(device: DeviceInterface): void {
    this.selectedDevice = device;
    this.showUpdateDeviceDialog = true;
  }

  public handleShowDeviceDetails(device: DeviceInterface): void {
    this.selectedDevice = device;
    this.showDeviceDetailsDialog = true;
  }

  public handleDeleteDevice(device: DeviceInterface): void {
    this.selectedDevice = device;
    this.showDeleteDeviceDialog = true;
  }

  public handleCreateDeviceConfirm(newDevice: CreateDeviceInterface): void {
    this.showCreateDeviceDialog = false;
    this._deviceApiService.createDevice(newDevice).subscribe(() => this.fetchDevices());
  }

  public handleUpdateDeviceConfirm(updatedDevice: UpdateDeviceInterface): void {
    this.showUpdateDeviceDialog = false;
    this._deviceApiService.updateDevice(updatedDevice).subscribe(() => this.fetchDevices());
  }

  public handleDeleteDeviceConfirm(device: DeviceInterface): void {
    this.showDeleteDeviceDialog = false;
    this._deviceApiService.deleteDevice(device.id).subscribe(() => this.fetchDevices());
  }
}
