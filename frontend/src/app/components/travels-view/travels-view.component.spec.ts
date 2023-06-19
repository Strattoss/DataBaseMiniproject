import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsViewComponent } from './travels-view.component';

describe('TravelsViewComponent', () => {
  let component: TravelsViewComponent;
  let fixture: ComponentFixture<TravelsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
