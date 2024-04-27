import { Genre } from "./genre";
import { Actor } from "./actor";
import { Director } from "./director";
import { Writer } from "./writer";
import { Episodes } from "./episodes";
import { User } from "./user";

export interface Movie {
    movie_id: number;
    name: string;
    slug: string;
    year: string;
    endYear: string;
    rated: string;
    directorList: Director[];
    actorList: Actor[];
    writerList: Writer[];
    genreList: Genre[];
    type: string;
    episodes: Episodes[];
    users: User[];
    released: string;
    runtime: string;
    language: string;
    country: string;
    awards: string;
    content: string;
    poster: string;
    thumb: string;
    trailer: string;
    view: number;
}
