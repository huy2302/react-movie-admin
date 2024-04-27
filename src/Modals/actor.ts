import { Movie } from './movie';

export interface Actor {
    id: number;
    name: string;
    age: string;
    country: string;
    gender: string;
    avt: string;
    movies: Movie[];
    description: string;
  }
  