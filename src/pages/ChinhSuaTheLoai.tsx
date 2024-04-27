import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getGenreByGenreID } from '../function/ApiFunction';
import DefaultLayout from '../layout/DefaultLayout';
import axios from "axios"
import { Episodes } from '../Modals/episodes';
import { Genre } from '../Modals/genre';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ChinhSuaTheLoai = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Genre>();

    const getMovie = async () => {
        let data = await getGenreByGenreID(id)
        // console.log(data)
        return data
    }
    // select type
    const [selectedType, setSelectedType] = useState<string>('');

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        console.log(type); // Log dữ liệu từ con lên cha
    };
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovie();
                setMovie(data);
                setMovieUpdate(data);
                setEpisodesMovie(data.episodes);
                // console.log(data.episodes);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies(); // Gọi hàm lấy dữ liệu khi component được render
    }, []);

    const [movieUpdate, setMovieUpdate] = useState({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setMovieUpdate({
            ...movieUpdate,
            [name]: value
        });
        
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            console.log(movieUpdate)
            // const response = await axios.post('http://localhost:8080/movie/add/movie/admin', movieUpdate, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
            // console.log('Response:', response.data);
            // Xử lý dữ liệu trả về nếu cần thiết
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handleGenreChange = (options: Option[]) => {
        // setSelectedType(options);
        const stringOption = options.map(item => item.text);
        const updatedMovie = { ...movieUpdate, genres: stringOption };
        setMovieUpdate(updatedMovie);
        // console.log(updatedMovie);
    };
    const handleActorChange = (options: Option[]) => {
        // setSelectedType(options);
        const stringOption = options.map(item => item.text);
        const updatedMovie = { ...movieUpdate, actors: stringOption };
        setMovieUpdate(updatedMovie);
    };

    const [episodesMovie, setEpisodesMovie] = useState<Episodes[]>([])

    const handleChange = (index: number, field: string, value: string) => {
        const updatedEpisodes = [...episodesMovie];
        // Tìm phần tử trong mảng với id tương ứng với index
        const episodeToUpdate = updatedEpisodes.findIndex(episode => episode.id === index);
        // console.log(episodeToUpdate);

        if (field === "filename") {
            updatedEpisodes[episodeToUpdate].filename = value
            setEpisodesMovie(updatedEpisodes);
            // console.log(episodeToUpdate)
        } else if (field === "link_embed") {
            updatedEpisodes[episodeToUpdate].link_embed = value
            setEpisodesMovie(updatedEpisodes);
            // console.log(episodeToUpdate)
        }
        setMovieUpdate({
            ...movieUpdate,
            episodes: episodesMovie
        });
        console.log(movieUpdate);

    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Chỉnh sửa chi tiết" />

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        {
                            movie ?
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5" >
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            ID
                                        </label>
                                        <input
                                            type="text"
                                            name='movie_id'
                                            onChange={handleInputChange}
                                            defaultValue={movie.genre_id}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Tên thể loại
                                        </label>
                                        <input
                                            type="text"
                                            name='genre'
                                            onChange={handleInputChange}
                                            defaultValue={movie.genre}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Tên thể loại (Tiếng Anh)
                                        </label>
                                        <input
                                            type="text"
                                            name='genre_vie'
                                            onChange={handleInputChange}
                                            defaultValue={movie.genre_vie}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        style={{ zIndex: 1000 }}
                                        className="z-1000 bottom-4 right-14 fixed m-auto inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    >
                                        Cập nhật
                                    </button>
                                </form>
                                :
                                <></>
                        }

                    </div>

                </div>
            </div>
        </DefaultLayout>
    );
};

export default ChinhSuaTheLoai;
