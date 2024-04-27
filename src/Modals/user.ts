import { Movie } from './movie';

export interface User {
    id: number;
    name: string;
    password: string;
    phone_number: string;
    role: string;
    avatar: string;
    favorites: Movie[];
    view: Movie[];
  }
  