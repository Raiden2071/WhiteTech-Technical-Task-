import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBookComponent {

}
