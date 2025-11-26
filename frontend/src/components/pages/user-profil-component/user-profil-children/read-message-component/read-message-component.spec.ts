import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMessageComponent } from './read-message-component';

describe('ReadMessageComponent', () => {
  let component: ReadMessageComponent;
  let fixture: ComponentFixture<ReadMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
