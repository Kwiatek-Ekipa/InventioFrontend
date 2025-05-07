import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'auth-card',
  imports: [Card],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public label = input('');
}
