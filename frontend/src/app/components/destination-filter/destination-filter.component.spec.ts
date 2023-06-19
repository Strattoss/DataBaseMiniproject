import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationFilterComponent } from './destination-filter.component';

describe('DestinationFilterComponent', () => {
  let component: DestinationFilterComponent;
  let fixture: ComponentFixture<DestinationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
