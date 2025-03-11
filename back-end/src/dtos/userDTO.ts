export interface UserDTO {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string | null;
  role: string;
  age?: string | null;
  phone?: string | null;
  address?: string | null;
}
