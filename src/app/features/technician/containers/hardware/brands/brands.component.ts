import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from 'primeng/card';
import { CreateHardwareBrandInterface, HardwareBrandInterface } from '@core/models';
import { TableModule } from 'primeng/table';
import { HardwareBrandApiService } from '@core/services';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonGroup } from 'primeng/buttongroup';
import {
  CreateBrandDialogComponent,
  DeleteBrandDialogComponent,
  UpdateBrandDialogComponent,
} from '@features/technician/components/hardware/dialogs/brand';

@Component({
  selector: 'technician-brands',
  imports: [
    Card,
    TableModule,
    IconField,
    InputIcon,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    Button,
    ProgressSpinner,
    ButtonGroup,
    DeleteBrandDialogComponent,
    CreateBrandDialogComponent,
    UpdateBrandDialogComponent,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  @Output() public onBrandsChange = new EventEmitter<void>();
  public selectedBrand: HardwareBrandInterface | undefined;
  public brands: HardwareBrandInterface[] = [];
  public isLoading: boolean = true;

  public searchControl = new FormControl('');
  public showDeleteBrandDialog = false;
  public showCreateBrandDialog = false;
  public showUpdateBrandDialog = false;

  private readonly _DEBOUNCE_TIME_MS = 300;

  public constructor(private _brandsApiService: HardwareBrandApiService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(this._DEBOUNCE_TIME_MS), distinctUntilChanged())
      .subscribe((): void => this._fetchBrands());
    this._fetchBrands();
  }

  public handleUpdateBrand(brand: HardwareBrandInterface): void {
    this.selectedBrand = brand;
    this.showUpdateBrandDialog = true;
  }

  public handleDeleteBrand(brand: HardwareBrandInterface): void {
    this.selectedBrand = brand;
    this.showDeleteBrandDialog = true;
  }

  public handleCreateBrandConfirm(brandName: string): void {
    const newBrand: CreateHardwareBrandInterface = { name: brandName };

    this.showCreateBrandDialog = false;
    this._brandsApiService.createBrand(newBrand).subscribe(() => {
      this.onBrandsChange.emit();
      this._fetchBrands();
    });
  }

  public handleUpdateBrandConfirm(updatedBrand: HardwareBrandInterface): void {
    this.showUpdateBrandDialog = false;
    this._brandsApiService.updateBrand(updatedBrand).subscribe(() => {
      this.onBrandsChange.emit();
      this._fetchBrands();
    });
  }

  public handleDeleteBrandConfirm(brand: HardwareBrandInterface): void {
    this.showDeleteBrandDialog = false;
    this._brandsApiService.deleteBrand(brand.id).subscribe(() => {
      this.onBrandsChange.emit();
      this._fetchBrands();
    });
  }

  private _fetchBrands(): void {
    this._brandsApiService
      .searchBrands(this.searchControl.value ?? '')
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((brands) => {
        this.brands = brands;
      });
  }
}
