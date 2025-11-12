import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IGComponent } from './ig-component';

describe('IGComponent', () => {
  let component: IGComponent;
  let fixture: ComponentFixture<IGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
