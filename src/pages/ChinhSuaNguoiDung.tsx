import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getGenreByGenreID, getUserDetail } from '../function/ApiFunction';
import DefaultLayout from '../layout/DefaultLayout';
import axios from "axios"
import { User } from '../Modals/user';
import user1 from "../images/user-avt/user-1.jpg"
import user2 from "../images/user-avt/user-2.jpg"
import user3 from "../images/user-avt/user-3.jpg"
import user4 from "../images/user-avt/user-4.jpg"
import "../css/imageSelector.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ChinhSuaNguoiDung = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<User>();
    const history = useNavigate();

    const getMovie = async () => {
        let data = await getUserDetail(id)
        // console.log(data)
        return data
    }
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovie();
                setMovie(data);
                setMovieUpdate(data);
                setSelectedImage(data.avatar)
                // console.log(data.episodes);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies(); // Gọi hàm lấy dữ liệu khi component được render
    }, []);

    const handleToast = (strMessage: string) => {
        if (strMessage === "ERR_BAD_REQUEST") {
            toast.error("Cập nhật không thành công.", {

            });
        } else if (strMessage === "SUCCESS") {
            toast.success("Cập nhật thành công!", {

            });
        } else if (strMessage === "ERR_NETWORK") {
            toast.warn("Không thể kết nối đến máy chủ. Vui lòng thử lại sau!", {

            });
        } else {
            toast.warn("Lỗi không xác định. Vui lòng thử lại sau!", {

            })
        };
    }

    const [movieUpdate, setMovieUpdate] = useState({});

    const handleInputChange = (e: any) => {
        // console.log(e.target.name)
        const { name, value } = e.target;
        setMovieUpdate({
            ...movieUpdate,
            [name]: value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(movieUpdate)
        try {
            const response = await axios.post('http://localhost:8080/user/edit', movieUpdate);
            handleToast("SUCCESS")
            setTimeout(() => {
                history('/admin/users');
            }, 1000);
            console.log('Response:', response.data);
            // Xử lý dữ liệu trả về nếu cần thiết
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    const [selectedImage, setSelectedImage] = useState(null);

    // Hàm xử lý khi click vào một hình ảnh
    const handleImageClick = (image: any) => {
        setMovieUpdate({
            ...movieUpdate,
            "avatar": image
        });
        setSelectedImage(image);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Chỉnh sửa chi tiết" />
            <ToastContainer />
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
                                            name='user_id'
                                            readOnly
                                            onChange={handleInputChange}
                                            defaultValue={movie.id}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Tên người dùng
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

                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                        <label className="mb-3 block text-black dark:text-white">
                                            Vai trò
                                        </label>
                                        <select
                                            name='role'
                                            onChange={handleInputChange}
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                                        >
                                            {
                                                movie.role === "0" ?
                                                    <>
                                                        <img src={user1} alt="" />
                                                        <option value="0" className="text-body dark:text-bodydark">Quản trị viên</option>
                                                        <option value="1" className="text-body dark:text-bodydark">Người dùng</option>
                                                    </> :
                                                    <>
                                                        <option value="1" className="text-body dark:text-bodydark">Người dùng</option>
                                                        <option value="0" className="text-body dark:text-bodydark">Quản trị viên</option>
                                                    </>
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            SĐT
                                        </label>
                                        <input
                                            type="text"
                                            name='phone_number'
                                            onChange={handleInputChange}
                                            defaultValue={movie.phone_number}
                                            // onChange={handleInputChange}
                                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white">
                                            Ảnh
                                        </label>
                                        <div>
                                            <button type='button' onClick={() => handleImageClick('1')}>
                                                <img className={selectedImage === '1' ? 'selected' : ''} src={user1} alt="Avatar" />
                                            </button>
                                            <button type='button' onClick={() => handleImageClick('2')}>
                                                <img className={selectedImage === '2' ? 'selected' : ''} src={user2} alt="Avatar" />
                                            </button>
                                            <button type='button' onClick={() => handleImageClick('3')}>
                                                <img className={selectedImage === '3' ? 'selected' : ''} src={user3} alt="Avatar" />
                                            </button>
                                            <button type='button' onClick={() => handleImageClick('4')}>
                                                <img className={selectedImage === '4' ? 'selected' : ''} src={user4} alt="Avatar" />
                                            </button>
                                        </div>
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

export default ChinhSuaNguoiDung;
