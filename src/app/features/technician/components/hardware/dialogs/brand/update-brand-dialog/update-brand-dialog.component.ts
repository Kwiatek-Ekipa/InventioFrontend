import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { UILabelComponent } from '@ui';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { HardwareBrandInterface } from '@core/models';

@Component({
  selector: 'technician-update-brand-dialog [isVisible] [brand]',
  imports: [Button, Dialog, UILabelComponent, ReactiveFormsModule, InputText],
  templateUrl: './update-brand-dialog.component.html',
  styleUrl: './update-brand-dialog.component.scss',
})
export class UpdateBrandDialogComponent implements OnInit {
  @Input() public isVisible = false;
  @Input() public brand!: HardwareBrandInterface;

  @Output() public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onConfirm = new EventEmitter<HardwareBrandInterface>();

  public brandNameControl = new FormControl('', [Validators.required]);

  public ngOnInit(): void {
    this.brandNameControl.setValue(this.brand.name);
  }

  public handleCreateBrandConfirm(): void {
    this.onConfirm.emit({
      ...this.brand,
      name: this.brandNameControl.value ?? '',
    });
  }

  public handleCreateBrandCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
