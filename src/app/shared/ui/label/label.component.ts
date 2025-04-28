import {Component, input} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'ui-label',
  imports: [
    FloatLabel
  ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class UILabelComponent {
  public label = input('');
  public for = input('');

}
