import { Movie } from './movie';

export interface Genre {
    genre_id: number;
    genre: string;
    genre_vie: string;
    movieList: Movie[];
  }
  