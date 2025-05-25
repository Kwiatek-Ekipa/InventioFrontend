import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonGroup } from 'primeng/buttongroup';
import { CreateHardwareCategoryInterface, HardwareBrandInterface, HardwareCategoryInterface } from '@core/models';
import { HardwareCategoryApiService } from '@core/services';
import {
  CreateCategoryDialogComponent,
} from '@features/technician/components/devices/dialogs/create-category-dialog/create-category-dialog.component';
import {
  UpdateCategoryDialogComponent,
} from '@features/technician/components/devices/dialogs/update-category-dialog/update-category-dialog.component';
import {
  DeleteCategoryDialogComponent,
} from '@features/technician/components/devices/dialogs/delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'technician-categories',
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
    CreateCategoryDialogComponent,
    UpdateCategoryDialogComponent,
    DeleteCategoryDialogComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  @Output() public onCategoriesChange = new EventEmitter<void>();
  public selectedCategory: HardwareCategoryInterface | undefined;
  public categories: HardwareCategoryInterface[] = [];
  public isLoading: boolean = true;

  public searchControl = new FormControl('');
  public showDeleteCategoryDialog = false;
  public showCreateCategoryDialog = false;
  public showUpdateCategoryDialog = false;

  private readonly _DEBOUNCE_TIME_MS = 300;

  public constructor(private _hardwareCategoryApiService: HardwareCategoryApiService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(this._DEBOUNCE_TIME_MS), distinctUntilChanged())
      .subscribe((): void => this._fetchBrands());
    this._fetchBrands();
  }

  public handleUpdateCategory(brand: HardwareCategoryInterface): void {
    this.selectedCategory = brand;
    this.showUpdateCategoryDialog = true;
  }

  public handleDeleteCategory(brand: HardwareCategoryInterface): void {
    this.selectedCategory = brand;
    this.showDeleteCategoryDialog = true;
  }

  public handleCreateCategoryConfirm(brandName: string): void {
    const newBrand: CreateHardwareCategoryInterface = { name: brandName };

    this.showCreateCategoryDialog = false;
    this._hardwareCategoryApiService.createCategory(newBrand).subscribe(() => {
      this.onCategoriesChange.emit();
      this._fetchBrands();
    });
  }

  public handleUpdateCategoryConfirm(updatedBrand: HardwareBrandInterface): void {
    this.showUpdateCategoryDialog = false;
    this._hardwareCategoryApiService.updateCategory(updatedBrand).subscribe(() => {
      this.onCategoriesChange.emit();
      this._fetchBrands();
    });
  }

  public handleDeleteCategoryConfirm(brand: HardwareBrandInterface): void {
    this.showDeleteCategoryDialog = false;
    this._hardwareCategoryApiService.deleteCategory(brand.id).subscribe(() => {
      this.onCategoriesChange.emit();
      this._fetchBrands();
    });
  }

  private _fetchBrands(): void {
    this._hardwareCategoryApiService
      .searchCategories(this.searchControl.value ?? '')
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
