import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { CreateHardwareCategoryInterface, HardwareBrandInterface, HardwareCategoryInterface } from '@core/models';
import { TableModule } from 'primeng/table';
import { HardwareCategoryApiService } from '@core/services';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ButtonGroup } from 'primeng/buttongroup';
import { CreateCategoryDialogComponent } from '@features/technician/components/devices/dialogs/create-category-dialog/create-category-dialog.component';
import { UpdateCategoryDialogComponent } from '@features/technician/components/devices/dialogs/update-category-dialog/update-category-dialog.component';
import { DeleteCategoryDialogComponent } from '@features/technician/components/devices/dialogs/delete-category-dialog/delete-category-dialog.component';

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
  public selectedCategory: HardwareCategoryInterface | undefined;
  public categories: HardwareCategoryInterface[] = [];
  public isLoading: boolean = true;

  public searchControl = new FormControl('');
  public showDeleteCategoryDialog = false;
  public showCreateCategoryDialog = false;
  public showUpdateCategoryDialog = false;

  public constructor(private _hardwareCategoryApiService: HardwareCategoryApiService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((): void => this.fetchBrands());
    this.fetchBrands();
  }

  public fetchBrands(): void {
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
    this._hardwareCategoryApiService.createCategory(newBrand).subscribe(() => this.fetchBrands());
  }

  public handleUpdateCategoryConfirm(updatedBrand: HardwareBrandInterface): void {
    this.showUpdateCategoryDialog = false;
    this._hardwareCategoryApiService.updateCategory(updatedBrand).subscribe(() => this.fetchBrands());
  }

  public handleDeleteCategoryConfirm(brand: HardwareBrandInterface): void {
    this.showDeleteCategoryDialog = false;
    this._hardwareCategoryApiService.deleteCategory(brand.id).subscribe(() => this.fetchBrands());
  }
}
