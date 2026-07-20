import { Injectable, computed, inject, signal } from '@angular/core';
import { CreateLoginOfficeRequest } from '../data-access/models/create-login-office-request.model';
import { LoginOfficeApiService } from '../data-access/services/login-office-api.service';
import { LoginOffice } from '../data-access/models/login-office.model';
import { UpdateLoginOfficeRequest } from '../data-access/models/update-login-office-request.model';

@Injectable({
  providedIn: 'root',
})
export class LoginOfficeStore {
  private readonly api = inject(LoginOfficeApiService);

  readonly loading = signal(false);

  readonly loginOffices = signal<LoginOffice[]>([]);

  readonly error = signal<Error | null>(null);

  readonly hasLoginOffices = computed(() => this.loginOffices().length > 0);
  readonly searchTerm = signal('');

  loadLoginOffices(): void {
    this.loading.set(true);

    this.error.set(null);

    this.api.getLoginOffices().subscribe({
      next: (response) => {
        this.loginOffices.set(response.data);

        this.loading.set(false);
      },

      error: (error) => {
        this.error.set(error);

        this.loading.set(false);
      },
    });
  }

  createLoginOffice(request: CreateLoginOfficeRequest): void {
    this.loading.set(true);

    this.error.set(null);

    this.api.createLoginOffice(request).subscribe({
      next: () => {
        this.loadLoginOffices();
      },

      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      },
    });
  }
  updateLoginOffice(request: UpdateLoginOfficeRequest): void {
    this.loading.set(true);

    this.error.set(null);

    this.api.updateLoginOffice(request).subscribe({
      next: () => {
        this.loadLoginOffices();
      },

      error: (error) => {
        this.error.set(error);

        this.loading.set(false);
      },
    });
  }
  deleteLoginOffice(id: number): void {
    this.loading.set(true);

    this.error.set(null);

    this.api.deleteLoginOffice(id).subscribe({
      next: () => {
        this.loadLoginOffices();
      },

      error: (error) => {
        this.error.set(error);

        this.loading.set(false);
      },
    });
  }
  readonly filteredLoginOffices = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    if (!search) {
      return this.loginOffices();
    }

    return this.loginOffices().filter(
      (office) =>
        office.name.toLowerCase().includes(search) ||
        office.code.toLowerCase().includes(search) ||
        office.city.toLowerCase().includes(search),
    );
  });
  setSearchTerm(search: string): void {
    this.searchTerm.set(search);
  }
}
