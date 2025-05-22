import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { HardwareBrandInterface } from '@core/models';

@Component({
  selector: 'technician-delete-brand-dialog [isVisible] [brand]',
  imports: [Button, Dialog],
  templateUrl: './delete-brand-dialog.component.html',
  styleUrl: './delete-brand-dialog.component.scss',
})
export class DeleteBrandDialogComponent {
  @Input() public isVisible = false;
  @Input() public brand!: HardwareBrandInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<void>();

  public handleDeleteBrandConfirm(): void {
    this.onConfirm.emit();
  }

  public handleDeleteBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
