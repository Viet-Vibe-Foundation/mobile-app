export interface Post {
  id?: String;
  title: String;
  content?: String;
  summary?: String;
  imgUrl?: String;
  isPublished?: Boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: String;
  totalLike: number;
  totalVisited: number;
}
