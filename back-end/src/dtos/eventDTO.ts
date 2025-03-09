export interface EventDTO {
  id: string | null;
  title: string | null;
  description?: string | null;
  location: string | null;
  price: number | null;
  capacity?: number | null;
  ticketsSold?: number | null;
  days?: string[];
  startTime: string | null;
  startDate: Date | null;
  endDate?: Date | null;
  endTime?: string | null;
  imgUrl: string | null;
  isPublished: Boolean;
  remainingTicket: number | null; // Capacity - ticketSold
  eventType: string | null;
}
