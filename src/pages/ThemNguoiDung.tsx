import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { user1, user2, user3, user4 } from './Element/ImportImage';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ThemNguoiDung = () => {

    const handleToast = (strMessage: string) => {
        if (strMessage === "ERR_BAD_REQUEST") {
            toast.error("Thêm mới thất bại. Vui lòng thử lại sau!", {

            });
        } else if (strMessage === "SUCCESS") {
            toast.success("Thêm mới thành công.", {

            });
        } else if (strMessage === "wrong_pass") {
            toast.warning("Mật khẩu nhập lại không chính xác, vui lòng nhập lại!", {

            });
        }
         else {
            toast.warn("Vui lòng nhập đủ thông tin.", {

            });
        }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(movieUpdate);
        if (movieUpdate.password === movieUpdate.re_password) {
            try {
                if (Object.keys(movieUpdate).length > 0) {
                    const response = await axios.post('http://localhost:8080/user/add', movieUpdate, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    handleToast("SUCCESS")
                } else {
                    handleToast("")
                }
                // console.log(genreUpdate);
    
                // Xử lý dữ liệu trả về nếu cần thiết
            } catch (error) {
                handleToast("ERR_BAD_REQUEST")
                console.error('Error:', error);
                // Xử lý lỗi nếu cần thiết
            }
        } else {
            handleToast("wrong_pass")
        }
        
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setMovieUpdate({
            ...movieUpdate,
            [name]: value
        });
    };

    const [movieUpdate, setMovieUpdate] = useState({
        username: '',
        password: '',
        re_password: '',
        phone_number: '',
        role: '',
        avatar: ''
    });
    
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image: any) => {
        setMovieUpdate({
            ...movieUpdate,
            "avatar": image
        });
        setSelectedImage(image);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Thêm người dùng" />
            <ToastContainer />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5.5 p-6.5" >
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    ID
                                </label>
                                <input
                                    type="text"
                                    name='movie_id'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre_id}
                                    placeholder='Trường này sẽ tự được khởi tạo, không cần điền ở đây'
                                    readOnly
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Tên người dùng
                                </label>
                                <input
                                    type="text"
                                    name='username'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre}
                                    // onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre_vie}
                                    // onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name='re_password'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre_vie}
                                    // onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    name='phone_number'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre_vie}
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
                                            <option value="0" className="text-body dark:text-bodydark">Quản trị viên</option>
                                            <option value="1" className="text-body dark:text-bodydark">Người dùng</option> 
                                        </select>
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

export default ThemNguoiDung;
