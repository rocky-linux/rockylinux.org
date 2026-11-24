export interface ScheduledBranding {
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
  favicon: string;
  tooltip: string;
  recurring?: boolean;
  iconSize?: number;
  iconX?: number;
  iconY?: number;
}

export type BrandingSchedule = ScheduledBranding[];
