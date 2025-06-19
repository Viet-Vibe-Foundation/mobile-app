import {EventSchedule} from './eventSchedule';

export interface Event {
  id: string | null;
  title: string | null;
  description?: string | null;
  location: string | null;
  price: number | null;
  capacity?: number | null;
  ticketsSold?: number | null;
  days: string[];
  startTime: string | null;
  startDate: Date | null;
  endDate?: Date | null;
  endTime?: string | null;
  imgUrl: string | null;
  formLink: string | null;
  isPublished: Boolean;
  remainingTicket: number | null; // Capacity - ticketSold
  eventType: string | null;
  schedules?: EventSchedule[];
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  url: string;
  platform: string;
}
