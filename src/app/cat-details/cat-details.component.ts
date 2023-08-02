import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss']
})
export class CatDetailsComponent {
  @Output() goBackAction: EventEmitter<string> = new EventEmitter();

  public goBack(): void {
    this.goBackAction.emit();
  }
}
