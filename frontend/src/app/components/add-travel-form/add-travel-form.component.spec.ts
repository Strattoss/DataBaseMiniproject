import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelFormComponent } from './add-travel-form.component';

describe('AddTravelFormComponent', () => {
  let component: AddTravelFormComponent;
  let fixture: ComponentFixture<AddTravelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTravelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
