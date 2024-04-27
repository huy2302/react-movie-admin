import { Movie } from './movie';

export interface Director {
    director_id: number;
    directorName: string;
    age: string;
    country: string;
    gender: string;
    avt: string;
    movies: Movie[];
    description: string;
  }
  