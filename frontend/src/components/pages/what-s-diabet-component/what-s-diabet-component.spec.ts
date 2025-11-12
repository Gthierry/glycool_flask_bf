import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatSDiabetComponent } from './what-s-diabet-component';

describe('WhatSDiabetComponent', () => {
  let component: WhatSDiabetComponent;
  let fixture: ComponentFixture<WhatSDiabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatSDiabetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatSDiabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
