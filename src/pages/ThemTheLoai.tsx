import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Option {
    value: string;
    text: string;
    selected: boolean;
    element?: HTMLElement;
}

const ThemTheLoai = () => { 
    const [genreUpdate, setGenreUpdate] = useState({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setGenreUpdate({
            ...genreUpdate,
            [name]: value
        });
    };
    const handleToast = (strMessage: string) => {
        if (strMessage === "ERR_BAD_REQUEST") {
          toast.error("Thêm mới thất bại. Vui lòng thử lại sau!", {
    
          });
        } else if (strMessage === "SUCCESS") {
          toast.success("Thêm mới thành công.", {
    
          });
        } else {
          toast.warn("Vui lòng nhập đủ thông tin.", {
    
          });
        }
      };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (Object.keys(genreUpdate).length > 0) {
                const response = await axios.post('http://localhost:8080/genre/add/genre/admin', genreUpdate, {
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
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Thêm thể loại mới" />
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
                                    Tên thể loại
                                </label>
                                <input
                                    type="text"
                                    name='genre'
                                    onChange={handleInputChange}
                                    // defaultValue={movie.genre}
                                    // onChange={handleInputChange}
                                    required
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
                                    // defaultValue={movie.genre_vie}
                                    // onChange={handleInputChange}
                                    required
                                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                                />
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

export default ThemTheLoai;
