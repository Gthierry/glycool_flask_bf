import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInbox } from './message-inbox';

describe('MessageInbox', () => {
  let component: MessageInbox;
  let fixture: ComponentFixture<MessageInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
