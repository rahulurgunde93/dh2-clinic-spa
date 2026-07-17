import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationHome } from './administration-home';

describe('AdministrationHome', () => {
  let component: AdministrationHome;
  let fixture: ComponentFixture<AdministrationHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
