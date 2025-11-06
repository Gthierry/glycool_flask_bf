import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosProfilComponent } from './infos-profil-component';

describe('InfosProfilComponent', () => {
  let component: InfosProfilComponent;
  let fixture: ComponentFixture<InfosProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
