import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginOfficeCard } from './login-office-card';

describe('LoginOfficeCard', () => {
  let component: LoginOfficeCard;
  let fixture: ComponentFixture<LoginOfficeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOfficeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOfficeCard);
    component = fixture.componentInstance;

    component.office = {
      id: 1,
      name: 'Helsinki Central',
      code: 'HEL001',
      city: 'Helsinki',
      status: 'Active',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display office name', () => {
    const title = fixture.nativeElement.querySelector('h3');

    expect(title.textContent).toContain('Helsinki Central');
  });

  it('should display office code', () => {
    const code = fixture.nativeElement.querySelector('small');

    expect(code.textContent).toContain('HEL001');
  });

  it('should display city', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Helsinki');
  });

  it('should display status', () => {
    const badge = fixture.nativeElement.querySelector('.status-badge');

    expect(badge.textContent).toContain('Active');
  });

  it('should emit edit event', () => {
    const spy = vi.spyOn(component.edit, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].nativeElement.click();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(component.office);
  });

  it('should emit delete event', () => {
    const spy = vi.spyOn(component.delete, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[1].nativeElement.click();

    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(component.office);
  });
});
