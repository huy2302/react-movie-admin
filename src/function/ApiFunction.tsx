import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080",
    withCredentials: true
})

export async function getAllWithPaginate() {
    try {
        const response = await api.get("/movie/all")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

export async function getMovieByGenre(genre: string, type: string) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/all`, {
            params: {
                genre: genre,
                type: type
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getAllUser() {
    try {
        const response = await api.get("/user/all")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMovieAdvance(choice: string, type: string) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/advanced`, {
            params: {
                choice: choice,
                type: type
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getFavoriteByUser(user_id: string) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/all/user`, {
            params: {
                user_id: user_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getWatchedByUser(user_id: string) {
    try {
        // console.log(id)
        const response = await api.get(`/movie/watched/user`, {
            params: {
                user_id: user_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMovieDetails(id: any) {
    try {
        const response = await api.get(`/movie/details`, {
            params: {
                id: id
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie details");
    }
}
export async function getUserDetail(id: any) {
    try {
        const response = await api.get(`/user/detail`, {
            params: {
                id: id
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie details");
    }
}
export async function updateFavorite(movieID: string, userID: string) {
    try {
        const response = await api.get(`/movie/favorite`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function checkFavorite(movieID: string, userID: string) {
    try {
        const response = await api.get(`/movie/favorite-user`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function updateView(movieID: string, userID: string) {
    try {
        const response = await api.get(`/movie/view`, {
            params: {
                movie_id: movieID,
                user_id: userID
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getActorDetail(id: string) {
    try {
        // console.log(id)
        const response = await api.get(`/people/actor`, {
            params: {
                id: id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

export async function getActors() {
    try {
        // console.log(id)
        const response = await api.get(`/people/actors`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getMoviesByRated() {
    try {
        // console.log(id)
        const response = await api.get(`/movie/movie-trailer-limit`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getAllGenre() {
    try {
        // console.log(id)
        const response = await api.get(`/genre/all`)
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getGenreByGenreID(genre_id: any) {
    try {
        // console.log(id)
        const response = await api.get(`/genre/detail`, {
            params: {
                id: genre_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function getGenresByMovieID(movie_id: string) {
    try {
        // console.log(id)
        const response = await api.get(`/genre/movie`, {
            params: {
                movie_id: movie_id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function deleteMovie(id: any) {
    try {
        // console.log(id)
        const response = await api.post(`/user/delete`, {
            params: {
                id: id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function deleteGenre(id: any) {
    try {
        // console.log(id)
        const response = await api.get(`/genre/delete/genre/admin`, {
            params: {
                id: id
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function UpdateMovie(formData: any) {
    try {
        // console.log(id)
        const response = await axios.post('/movie/add/movie/admin', formData);
        // console.log('Server response:', response);
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
export async function Updateuser(formData: any) {
    try {
        // console.log(id)
        const response = await axios.post('/movie/edit', formData);
        // console.log('Server response:', response);
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}
