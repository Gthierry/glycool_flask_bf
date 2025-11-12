import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncouragementsComponent } from './encouragements-component';

describe('EncouragementsComponent', () => {
  let component: EncouragementsComponent;
  let fixture: ComponentFixture<EncouragementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncouragementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncouragementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
