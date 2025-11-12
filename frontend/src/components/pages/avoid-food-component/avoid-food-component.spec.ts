import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoidFoodComponent } from './avoid-food-component';

describe('AvoidFoodComponent', () => {
  let component: AvoidFoodComponent;
  let fixture: ComponentFixture<AvoidFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvoidFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvoidFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
