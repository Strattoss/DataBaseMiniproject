import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailsComponent } from './travel-details.component';

describe('TravelDetailsComponent', () => {
  let component: TravelDetailsComponent;
  let fixture: ComponentFixture<TravelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
