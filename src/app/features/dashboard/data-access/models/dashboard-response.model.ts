import { DashboardActivity } from './dashboard-activity.model';
import { DashboardStat } from './dashboard-stat.model';

export interface DashboardResponse {
  statistics: DashboardStat[];
  activities: DashboardActivity[];
}
