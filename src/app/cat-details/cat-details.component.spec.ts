import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDetailsComponent } from './cat-details.component';

describe('CatDetailsComponent', () => {
  let component: CatDetailsComponent;
  let fixture: ComponentFixture<CatDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatDetailsComponent]
    });
    fixture = TestBed.createComponent(CatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
