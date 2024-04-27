import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getMovieDetails } from '../function/ApiFunction';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from "react-router-dom";
import { Movie } from '../Modals/movie';
import SelectTypeEdit from './Element/SelectTypeEdit';
import MultiSelectGenre from './Element/MultiSelectGenre';
import MultiSelectActor from './Element/MultiSelectActor';
import axios from "axios"
import { Episodes } from '../Modals/episodes';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ChinhSuaPhim = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie>();

    const getMovie = async () => {
        let data = await getMovieDetails(id)
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
            console.log(movieUpdate);
            
            const response = await axios.post('http://localhost:8080/movie/add/movie/admin', movieUpdate, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
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
                                            Movie ID
                                        </label>
                                        <input
                                            type="text"
                                            name='movie_id'
                                            onChange={handleInputChange}
                                            defaultValue={movie.movie_id}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Tên phim
                                        </label>
                                        <input
                                            type="text"
                                            name='name'
                                            onChange={handleInputChange}
                                            defaultValue={movie.name}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            name='slug'
                                            onChange={handleInputChange}
                                            defaultValue={movie.slug}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Năm
                                        </label>
                                        <input
                                            type="number"
                                            name='year'
                                            onChange={handleInputChange}
                                            defaultValue={movie.year}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div className="z-50">
                                        <MultiSelectGenre id="multiSelectGenre" movieID={movie.movie_id} onSelectGenre={handleGenreChange} />
                                    </div>
                                    <div className="z-40">
                                        <MultiSelectActor id="multiSelectActor" movieID={movie.movie_id} onSelectGenre={handleActorChange} />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Đánh giá
                                        </label>
                                        <input
                                            type="number"
                                            name='rated'
                                            onChange={handleInputChange}
                                            defaultValue={movie.rated}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Thời lượng
                                        </label>
                                        <input
                                            type="text"
                                            name='runtime'
                                            onChange={handleInputChange}
                                            defaultValue={movie.runtime}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Nội dung
                                        </label>
                                        <textarea
                                            rows={6}
                                            name='content'
                                            placeholder='Nội dung'
                                            onChange={handleInputChange}
                                            defaultValue={movie.content}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Loại phim
                                        </label>
                                        <SelectTypeEdit onSelectType={handleTypeChange} typeOfFilm={movie.type} />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Quốc gia
                                        </label>
                                        <input
                                            type="text"
                                            name='country'
                                            onChange={handleInputChange}
                                            defaultValue={movie.country}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Giải thưởng
                                        </label>
                                        <input
                                            type="text"
                                            name='awards'
                                            onChange={handleInputChange}
                                            defaultValue={movie.awards}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Link Poster
                                        </label>
                                        <input
                                            type="text"
                                            name='poster'
                                            onChange={handleInputChange}
                                            defaultValue={movie.poster}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Link Thumb
                                        </label>
                                        <input
                                            type="text"
                                            name='thumb'
                                            onChange={handleInputChange}
                                            defaultValue={movie.thumb}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            ID Trailer Youtube (Đoạn mã cuối đường link Youtube)
                                        </label>
                                        <input
                                            type="text"
                                            name='trailer'
                                            onChange={handleInputChange}
                                            defaultValue={movie.trailer}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-5.5 py-6.5">
                                        <div>
                                            <label className="mb-3 block text-black dark:text-white">
                                                Attach file
                                            </label>
                                            <input
                                                type="file"
                                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Tập phim: {movie.episodes.length} tập
                                        </label>
                                    </div>
                                    {
                                        movie?.episodes && movie?.episodes.length > 0 && movie?.episodes.map((item, index) => {
                                            return (

                                                <>
                                                    <div key={index * 34}>
                                                        <label className="mb-3 block text-black dark:text-white">
                                                            {item.name}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            defaultValue={item.filename}
                                                            onChange={(e) => handleChange(item.id, 'filename', e.target.value)}
                                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                                        />
                                                    </div>

                                                    <div>
                                                        <textarea
                                                            rows={2}
                                                            placeholder='Nội dung'
                                                            defaultValue={item.link_embed}
                                                            onChange={(e) => handleChange(item.id, 'link_embed', e.target.value)}
                                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        ></textarea>
                                                    </div>
                                                </>

                                            )
                                        })

                                    }
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

export default ChinhSuaPhim;
