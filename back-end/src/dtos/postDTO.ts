export interface PostDTO {
  id: string;
  title: string;
  content?: string | null;
  sumary?: string | null;
  imgUrl?: string | null;
  isPublished?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  totalLikes?: number;
  totalVisits?: number;
  authorName?: string;
}
