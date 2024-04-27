import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import DefaultLayout from '../layout/DefaultLayout';
import SelectTypeEdit from './Element/SelectTypeEdit';
import MultiSelectGenre from './Element/MultiSelectGenre';
import MultiSelectActor from './Element/MultiSelectActor';
import { UpdateMovie } from '../function/ApiFunction'
import axios from "axios"
import { Episodes } from '../Modals/episodes';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ThemPhim = () => {
    
    const [episodesMovie, setEpisodesMovie] = useState<Episodes[]>([
    ])

    // select type
    const [selectedType, setSelectedType] = useState<string>('');

    // thêm phim
    const UpdateMovieByForm = async (dataForm: any) => {
        let data = await UpdateMovie(dataForm)
        // console.log(data)
        return data
    }
    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        console.log(type); // Log dữ liệu từ con lên cha
    };

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
            const response = await axios.post('http://localhost:8080/movie/add/movie/admin', movieUpdate, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            console.log(movieUpdate);

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
    // thêm 1 phần tử trống
    const addNewEpisode = () => {
        // Tạo một bản sao của mảng episodesMovie hiện tại
        const updatedEpisodes = [...episodesMovie];
        const maxId = episodesMovie.reduce((max, episode) => Math.max(max, episode.id), 0);
    
        // Tạo một phần tử mới để thêm vào mảng
        const newEpisode: Episodes = {
            id: maxId + 1,
            name: `Tập ${episodesMovie.length + 1}`,
            slug: `tap-${episodesMovie.length + 1}`,
            filename: "",
            link_embed: ""
        };
        // Thêm phần tử mới vào mảng
        updatedEpisodes.push(newEpisode);
        // Cập nhật state với mảng episodes mới
        setEpisodesMovie(updatedEpisodes);
    };

    const removeEpisode = (idToRemove: number) => {
        console.log(idToRemove)
        // Tạo một mảng mới bằng cách lọc ra các phần tử không có id bằng idToRemove
        const updatedEpisodes = episodesMovie.filter(episode => episode.id !== idToRemove);
        // Cập nhật state với mảng mới đã lọc
        setEpisodesMovie(updatedEpisodes);
    };

    useEffect(() => {
        // addNewEpisode()
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Thêm phim mới" />

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5" >
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Movie ID
                                </label>
                                <input
                                    type="text"
                                    name='movie_id'
                                    onChange={handleInputChange}
                                    placeholder='Trường này sẽ tự được khởi tạo, không cần điền ở đây'
                                    readOnly
                                    // defaultValue={movie.movie_id}
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
                                    // defaultValue={movie.name}
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
                                    // defaultValue={movie.slug}
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
                                    // defaultValue={movie.year}
                                    // onChange={handleInputChange}
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
                            </div>

                            <div className="z-50">
                                <MultiSelectGenre id="multiSelectGenre" movieID={0} onSelectGenre={handleGenreChange} />
                            </div>
                            <div className="z-40">
                                <MultiSelectActor id="multiSelectActor" movieID={0} onSelectGenre={handleActorChange} />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Đánh giá
                                </label>
                                <input
                                    type="number"
                                    name='rated'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.rated}
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
                                    // defaultValue={movie.runtime}
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
                                    // defaultValue={movie.content}
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Loại phim
                                </label>
                                <SelectTypeEdit
                                    onSelectType={handleTypeChange}
                                    typeOfFilm={""}
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Quốc gia
                                </label>
                                <input
                                    type="text"
                                    name='country'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.country}
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
                                    // defaultValue={movie.awards}
                                    // onChange={handleInputChange}
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Link Trailer
                                </label>
                                <input
                                    type="text"
                                    name='trailer'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.poster}
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
                                    // defaultValue={movie.poster}
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
                                    // defaultValue={movie.thumb}
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
                                    {/* Tập phim: {movie.episodes.length} tập */}
                                </label>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Tập phim: {episodesMovie.length} tập
                                </label>
                            </div>
                            {
                                episodesMovie && episodesMovie.length > 0 && episodesMovie.map((item, index) => {
                                    return (

                                        <div className='flex justify-between items-center'>
                                            <div className='shadow-inner pb-3 w-11/12' key={index * 34}>
                                                <div className='mb-3'>
                                                    <input
                                                        type="text"
                                                        defaultValue={item.name}
                                                        onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                                                        className="mb-3 w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                                    />
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
                                            </div>
                                            <button onClick={() => removeEpisode(item.id)} className="p-4 hover:text-primary hover:bg-sky-100"><svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z" fill=""></path><path d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z" fill=""></path><path d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z" fill=""></path><path d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z" fill=""></path></svg></button>
                                        </div>
                                    )
                                })

                            }
                            <button
                                type='button'
                                onClick={addNewEpisode}
                                className=" m-auto inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Thêm 1 tập phim
                            </button>
                            <button
                                type='submit'
                                className=" m-auto inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Thêm mới
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ThemPhim;
