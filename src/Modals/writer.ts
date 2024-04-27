import { Movie } from './movie';

export interface Writer {
    writer_id: number;
    writerName: string;
    age: string;
    country: string;
    gender: string;
    avt: string;
    movies: Movie[];
    description: string;
  }
  