export interface Post {
  id: string | null;
  title: string | null;
  content?: string | null;
  sumary?: string | null;
  imgUrl?: string | null;
  isPublished?: Boolean;
  authorName?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  totalLikes: number;
  totalVisits: number;
}
