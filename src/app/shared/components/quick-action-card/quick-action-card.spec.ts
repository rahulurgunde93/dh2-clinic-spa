import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { QuickActionCard } from './quick-action-card';

describe('QuickActionCard', () => {
  let component: QuickActionCard;
  let fixture: ComponentFixture<QuickActionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionCard);
    component = fixture.componentInstance;

    component.title = 'Patients';
    component.icon = 'groups';
    component.route = '/patients';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
