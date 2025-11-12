import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateFoodComponent } from './moderate-food-component';

describe('ModerateFoodComponent', () => {
  let component: ModerateFoodComponent;
  let fixture: ComponentFixture<ModerateFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerateFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
