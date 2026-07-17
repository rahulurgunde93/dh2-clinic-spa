import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminCard } from './admin-card';

describe('AdminCard', () => {
  let component: AdminCard;
  let fixture: ComponentFixture<AdminCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCard);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
