import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchInputComponent } from './search-input';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default placeholder', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.placeholder).toBe('Search');
  });

  it('should display custom placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Search login offices');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(input.placeholder).toBe('Search login offices');
  });

  it('should emit searchChange when typing', () => {
    const emitSpy = vi.spyOn(component.searchChange, 'emit');

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'Helsinki';
    input.dispatchEvent(new Event('input'));

    expect(emitSpy).toHaveBeenCalledWith('Helsinki');
  });
});
