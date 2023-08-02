import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICatBreedData } from '../landing/landing.component';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss']
})
export class CatDetailsComponent {
  @Input() catDataDetails: ICatBreedData[];
  @Output() goBackAction: EventEmitter<string> = new EventEmitter();

  public goBack(): void {
    this.goBackAction.emit();
  }
}
