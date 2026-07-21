import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
})
export class SearchInputComponent {
  placeholder = input('Search');
  searchChange = output<string>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
