import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'technician-create-category-dialog [isVisible]',
  imports: [Button, Dialog, UILabelComponent, ReactiveFormsModule, InputText],
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.scss',
})
export class CreateCategoryDialogComponent {
  @Input() public isVisible = false;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<string>();

  public categoryNameControl = new FormControl('', [Validators.required]);

  public handleCreateCategoryConfirm(): void {
    if (this.categoryNameControl.invalid) {
      this.categoryNameControl.markAllAsTouched();

      return;
    }

    this.onConfirm.emit(this.categoryNameControl.value ?? '');
  }

  public handleCreateCategoryCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
