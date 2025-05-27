import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { HardwareCategoryInterface } from '@core/models';
import { IrreversibleOperationTagComponent } from '@ui';

@Component({
  selector: 'technician-delete-category-dialog [isVisible] [category]',
  imports: [Button, Dialog, IrreversibleOperationTagComponent],
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.scss',
})
export class DeleteCategoryDialogComponent {
  @Input() public isVisible = false;
  @Input() public category!: HardwareCategoryInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<void>();

  public handleDeleteBrandConfirm(): void {
    this.onConfirm.emit();
  }

  public handleDeleteBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
