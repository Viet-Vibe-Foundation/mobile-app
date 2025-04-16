export interface Post {
  id: string | null;
  title: string | null;
  content?: string | null;
  summary?: string | null;
  imgUrl?: string | null;
  isPublished?: Boolean;
  authorName?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  liked?: boolean;
  _count: {
    postLikes?: number;
    postVisits?: number;
  };
}
