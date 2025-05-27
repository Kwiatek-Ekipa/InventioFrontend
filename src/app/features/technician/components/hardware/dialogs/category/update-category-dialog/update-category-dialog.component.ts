import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { HardwareCategoryInterface } from '@core/models';

@Component({
  selector: 'technician-update-category-dialog [isVisible] [category]',
  imports: [Button, Dialog, UILabelComponent, ReactiveFormsModule, InputText],
  templateUrl: './update-category-dialog.component.html',
  styleUrl: './update-category-dialog.component.scss',
})
export class UpdateCategoryDialogComponent implements OnInit {
  @Input() public isVisible = false;
  @Input() public category!: HardwareCategoryInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<HardwareCategoryInterface>();

  public brandNameControl = new FormControl('', [Validators.required]);

  public ngOnInit(): void {
    this.brandNameControl.setValue(this.category.name);
  }

  public handleCreateBrandConfirm(): void {
    if (this.brandNameControl.invalid) {
      this.brandNameControl.markAllAsTouched();

      return;
    }

    this.onConfirm.emit({
      ...this.category,
      name: this.brandNameControl.value!,
    });
  }

  public handleCreateBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
