export interface ScheduledBranding {
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
  favicon: string;
  tooltip: string;
  recurring?: boolean;
}

export type BrandingSchedule = ScheduledBranding[];
