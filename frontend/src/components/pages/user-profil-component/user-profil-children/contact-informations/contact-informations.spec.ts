import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformations } from './contact-informations';

describe('ContactInformations', () => {
  let component: ContactInformations;
  let fixture: ComponentFixture<ContactInformations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInformations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInformations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
