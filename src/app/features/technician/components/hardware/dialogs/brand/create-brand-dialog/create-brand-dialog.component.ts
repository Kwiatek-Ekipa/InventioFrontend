import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'technician-create-brand-dialog [isVisible]',
  imports: [Button, Dialog, UILabelComponent, ReactiveFormsModule, InputText],
  templateUrl: './create-brand-dialog.component.html',
  styleUrl: './create-brand-dialog.component.scss',
})
export class CreateBrandDialogComponent {
  @Input() public isVisible = false;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<string>();

  public brandNameControl = new FormControl('', [Validators.required]);

  public handleCreateBrandConfirm(): void {
    this.onConfirm.emit(this.brandNameControl.value ?? '');
  }

  public handleCreateBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
