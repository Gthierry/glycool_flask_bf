import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsDiabetRestaurantComponent } from './whats-diabet-restaurant-component';

describe('WhatsDiabetRestaurantComponent', () => {
  let component: WhatsDiabetRestaurantComponent;
  let fixture: ComponentFixture<WhatsDiabetRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsDiabetRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsDiabetRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
