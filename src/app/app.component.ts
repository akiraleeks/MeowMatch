import { Component, TemplateRef } from '@angular/core';

export interface ICatDetail {
  showDetail: boolean;
  template?: TemplateRef<void>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDetail: boolean;
  public detailTemplate: TemplateRef<void>;

  public detailAction(event: ICatDetail): void {
    this.detailTemplate = event.template;
    this.showDetail = event.showDetail;
  }
}
