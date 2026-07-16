import { Injectable, computed, inject, signal } from '@angular/core';
import { DashboardApiService } from '../data-access/services/dashboard-api.service';
import { DashboardActivity } from '../data-access/models/dashboard-activity.model';
import { DashboardStat } from '../data-access/models/dashboard-stat.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  private readonly api = inject(DashboardApiService);

  readonly loading = signal(false);

  readonly statistics = signal<DashboardStat[]>([]);

  readonly activities = signal<DashboardActivity[]>([]);

  readonly error = signal<Error | null>(null);

  readonly hasStatistics = computed(() => this.statistics().length > 0);

  readonly hasActivities = computed(() => this.activities().length > 0);

  loadDashboard(): void {
    this.loading.set(true);

    this.error.set(null);

    this.api.getDashboard().subscribe({
      next: (response) => {
        this.statistics.set(response.data.statistics);

        this.activities.set(response.data.activities);

        this.loading.set(false);
      },

      error: (error) => {
        this.error.set(error);

        this.loading.set(false);
      },
    });
  }
}
